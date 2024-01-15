try {
  throw new Error('catch-by-customErrorHandler');
} catch (e) {
  window.handleErrorReporter(e);
  console.log(e);
}
