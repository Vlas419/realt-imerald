/**
 * Universal Analytics Dispatcher for GA4, GTM, and Yandex.Metrika.
 * Dispatches events without altering any UI elements.
 */

export function trackGoal(goal: 'form_send' | 'cta_click', params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // 1. Google Tag Manager / GA4 dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: goal,
    timestamp: new Date().toISOString(),
    ...params,
  });

  // 2. Yandex.Metrika reachGoal
  try {
    const win = window as any;

    // Detect all active Yandex Metrika counters on page
    const ymCounters: string[] = [];

    // Check window['yaCounterXXXXXXX']
    Object.keys(win).forEach((k) => {
      const match = k.match(/^yaCounter(\d+)$/);
      if (match && match[1]) {
        ymCounters.push(match[1]);
      }
    });

    // Check saved or default counter
    const savedYm = localStorage.getItem('ym_counter_id');
    if (savedYm && !ymCounters.includes(savedYm)) {
      ymCounters.push(savedYm);
    }

    // Call ym(counterId, 'reachGoal', goalName)
    if (typeof win.ym === 'function') {
      if (ymCounters.length > 0) {
        ymCounters.forEach((id) => {
          win.ym(id, 'reachGoal', goal, params);
        });
      } else {
        // Fallback: call with placeholder/configured id or queue
        win.ym('all', 'reachGoal', goal, params);
      }
    }

    // Also call directly on yaCounter instances if available
    ymCounters.forEach((id) => {
      if (win[`yaCounter${id}`] && typeof win[`yaCounter${id}`].reachGoal === 'function') {
        win[`yaCounter${id}`].reachGoal(goal, params);
      }
    });
  } catch (err) {
    // Fail silently in production
  }
}
