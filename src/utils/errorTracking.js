const isBrowser = typeof window !== 'undefined';

const captureConsoleFallback = (payload) => {
  if (import.meta.env.DEV) {
    console.error('Captured frontend error', payload);
  }
};

export const reportFrontendError = (error, context = {}) => {
  const payload = {
    message: error?.message || 'Unknown frontend error',
    stack: error?.stack,
    context,
    timestamp: new Date().toISOString(),
  };

  if (isBrowser && window.Sentry?.captureException) {
    window.Sentry.captureException(error, { extra: context });
    return;
  }

  if (isBrowser && window.LogRocket?.captureException) {
    window.LogRocket.captureException(error, { extra: context });
    return;
  }

  captureConsoleFallback(payload);
};
