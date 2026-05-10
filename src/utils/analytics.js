const hasWindow = typeof window !== 'undefined';

export const analyticsConfig = {
  gaId: import.meta.env.VITE_GA_ID,
  fbPixelId: import.meta.env.VITE_FB_PIXEL_ID,
  hotjarId: import.meta.env.VITE_HOTJAR_ID,
  hotjarVersion: import.meta.env.VITE_HOTJAR_VERSION || 6,
};

export const initializeAnalytics = () => {
  if (!hasWindow) return;

  if (analyticsConfig.gaId && !window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', analyticsConfig.gaId, { send_page_view: false });
  }

  if (analyticsConfig.fbPixelId && !window.fbq) {
    window.fbq = (...args) => {
      window._fbqQueue = window._fbqQueue || [];
      window._fbqQueue.push(args);
    };
    window.fbq('init', analyticsConfig.fbPixelId);
  }

  if (analyticsConfig.hotjarId && !window.hj) {
    window.hj = (...args) => {
      window._hjQueue = window._hjQueue || [];
      window._hjQueue.push(args);
    };
    window._hjSettings = { hjid: analyticsConfig.hotjarId, hjsv: analyticsConfig.hotjarVersion };
  }
};

export const trackPageView = (path) => {
  if (!hasWindow) return;

  if (window.gtag && analyticsConfig.gaId) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: path,
    });
  }

  if (window.fbq && analyticsConfig.fbPixelId) {
    window.fbq('track', 'PageView');
  }
};
