import { useState, useEffect } from 'react';
import { Activity, Check, Copy, HelpCircle, X, Shield, Terminal, ArrowRight } from 'lucide-react';

interface EventLog {
  id: string;
  time: string;
  event: string;
  data: Record<string, any>;
}

export function AnalyticsHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [events, setEvents] = useState<EventLog[]>([]);
  const [customGtmId, setCustomGtmId] = useState(() => {
    try {
      return localStorage.getItem('gtm_id') || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    // Intercept dataLayer pushes to show live events
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      const originalPush = window.dataLayer.push.bind(window.dataLayer);

      window.dataLayer.push = function (...args: any[]) {
        args.forEach((arg) => {
          if (typeof arg === 'object' && arg && arg.event) {
            setEvents((prev) => [
              {
                id: Math.random().toString(),
                time: new Date().toLocaleTimeString(),
                event: arg.event,
                data: arg,
              },
              ...prev.slice(0, 15),
            ]);
          }
        });
        return originalPush(...args);
      };
    }
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveGtmId = () => {
    const trimmed = customGtmId.trim().toUpperCase();
    if (trimmed.startsWith('GTM-')) {
      localStorage.setItem('gtm_id', trimmed);
      window.location.reload();
    }
  };

  return (
    <>
      {/* Floating trigger button in bottom right corner */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold rounded-full shadow-lg border border-slate-700/80 backdrop-blur-md transition-all cursor-pointer group hover:scale-105"
          title="Инспектор GTM и GA4 для отчёта"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">GTM & GA4 Инспектор</span>
          <span className="sm:hidden font-mono text-[10px]">GTM</span>
          {events.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          )}
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center items-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl p-6 relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Шпаргалка параметров для GTM и GA4
                  </h3>
                  <p className="text-xs text-slate-400">
                    Точные идентификаторы лендинга для выполнения Шагов 1–8
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Parameters Table */}
            <div className="mt-5 space-y-4 text-xs">
              
              {/* Шаг 5: Form ID */}
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Шаг 5. Form ID (Отправка формы)
                  </span>
                  <p className="text-slate-300 mt-0.5 font-mono text-sm">
                    lead-form
                  </p>
                  <span className="text-[10px] text-slate-500">
                    Условие в GTM: <code>Form ID</code> равно <code>lead-form</code> (Событие: <code>form_send</code>)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('lead-form', 'form_id')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0 transition-colors"
                >
                  {copiedField === 'form_id' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Скопировать</span>
                    </>
                  )}
                </button>
              </div>

              {/* Шаг 6: Click ID */}
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                    Шаг 6. Click ID (Клик по CTA)
                  </span>
                  <p className="text-slate-300 mt-0.5 font-mono text-sm">
                    cta-button
                  </p>
                  <span className="text-[10px] text-slate-500">
                    Условие в GTM: <code>Click ID</code> равно <code>cta-button</code> (Событие: <code>cta_click</code>)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('cta-button', 'click_id')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0 transition-colors"
                >
                  {copiedField === 'click_id' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Скопировать</span>
                    </>
                  )}
                </button>
              </div>

              {/* Быстрое подключение вашего GTM ID */}
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
                  Шаг 3. Подключение вашего GTM контейнера
                </span>
                <p className="text-[11px] text-slate-400">
                  Код GTM уже установлен в <code>&lt;head&gt;</code> и <code>&lt;body&gt;</code>. Если вы хотите подключить свой личный контейнер прямо сейчас:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customGtmId}
                    onChange={(e) => setCustomGtmId(e.target.value)}
                    placeholder="GTM-XXXXXXX"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleSaveGtmId}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs cursor-pointer"
                  >
                    Активировать
                  </button>
                </div>
              </div>

              {/* dataLayer Live Monitor */}
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    Монитор событий dataLayer (в реальном времени):
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {events.length} событий
                  </span>
                </div>

                {events.length === 0 ? (
                  <p className="text-[11px] text-slate-500 italic py-2">
                    Нажмите кнопку «Найти» (CTA) или отправьте форму лид-магнита, чтобы увидеть событие здесь.
                  </p>
                ) : (
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px]">
                    {events.map((e) => (
                      <div
                        key={e.id}
                        className="p-1.5 bg-slate-900 rounded border border-slate-800 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">{e.event}</span>
                          <span className="text-slate-400 text-[10px]">
                            {JSON.stringify(e.data)}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500">{e.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Для DevTools: ПКМ по форме/кнопке ➔ «Просмотреть код»</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-emerald-400 hover:underline cursor-pointer"
              >
                Закрыть
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
