try {
  throw new Error('catch-by-customErrorHandler');
} catch (e) {
  console.log(e);
}
