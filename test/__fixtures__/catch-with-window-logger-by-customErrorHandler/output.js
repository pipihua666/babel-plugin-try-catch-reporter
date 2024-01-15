try {
  throw new Error('catch-with-window-logger-by-customErrorHandler');
} catch (e) {
  window.Sentry.captureException(e);
}
