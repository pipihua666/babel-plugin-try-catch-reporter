try {
  throw new Error('catch-by-has-logger-customErrorHandler');
} catch (e) {
  window.handleErrorReporter(e);
}
