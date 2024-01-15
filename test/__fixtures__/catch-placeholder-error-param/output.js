try {
  throw new Error('catch-placeholder-error-param');
} catch (_) {
  window.Sentry.captureException(_);
  console.log(_);
}
