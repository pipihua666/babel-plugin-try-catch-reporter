try {
  throw new Error('test');
} catch (_) {
  const Sentry = {};
  Sentry.captureException(_);
}
