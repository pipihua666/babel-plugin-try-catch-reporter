try {
  throw new Error('catch-with-window-logger');
} catch (e) {
  window.Sentry.captureException(e);
}
