try {
  throw new Error('catch-upper-error-param');
} catch (E) {
  window.Sentry.captureException(E);
  console.log(E);
}
