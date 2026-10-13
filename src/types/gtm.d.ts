declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
    __GTM_ID__?: string;
  }
}

export {};
