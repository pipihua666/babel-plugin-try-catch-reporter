try {
  throw new Error('catch-blank-block');
} catch (error) {
  window.Sentry.captureException(error);
  console.log('error');
}
