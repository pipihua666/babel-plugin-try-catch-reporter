# `babel-plugin-try-catch-reporter`

## Start

> npm i -D babel-plugin-try-catch-reporter

## Config

- `loggerName` string required -- Log object name

- `loggerMethod` string required -- Log object methods

- `exclude` array optional (default ['\_\_mocks\_\_', '\_\_tests\_\_', '\_\_snapshots\_\_', 'node_modules']) -- Folders not processed, added values are merged

- `include` array optional -- Target folder for processing

- `customErrorHandler` string optional -- If there is a custom error handling function, it must be mounted on the window global object, loggerName does not take effect

## config by loggerName

```json
{
  "plugins": [
    [
      "babel-plugin-try-catch-reporter",
      {
        "loggerMethod": "captureException",
        "loggerName": "window.Sentry"
      }
    ]
  ]
}
```

### Demo

```js
try {
} catch {}

try {
} catch (_) {}

try {
} catch (E) {}

try {
  throw new Error('test');
} catch (_) {
  _Sentry.captureException(_);
}

try {
} catch (e) {
  let a = 0;
  window.Sentry.captureException(e);
}
```

gets compiled to:

```js
try {
} catch (error) {
  if (typeof window.Sentry === 'object' && typeof window.Sentry.captureException === 'function') {
    window.Sentry.captureException(error);
  }
}

try {
} catch (_) {
  if (typeof window.Sentry === 'object' && typeof window.Sentry.captureException === 'function') {
    window.Sentry.captureException(_);
  }
}

try {
} catch (E) {
  if (typeof window.Sentry === 'object' && typeof window.Sentry.captureException === 'function') {
    window.Sentry.captureException(E);
  }
}

try {
  throw new Error('test');
} catch (_) {
  _Sentry.captureException(_);
}

try {
} catch (e) {
  let a = 0;
  window.Sentry.captureException(e);
}
```

## config by customErrorHandler

```json
{
  "plugins": [
    [
      "babel-plugin-try-catch-reporter",
      {
        "loggerMethod": "captureException",
        "loggerName": "window.Sentry",
        "customErrorHandler": "window.handleErrorReporter"
      }
    ]
  ]
}
```

### Demo

```js
try {
  throw new Error('catch-by-has-logger-customErrorHandler');
} catch (e) {
  window.handleErrorReporter(e);
}

try {
  throw new Error('catch-with-window-logger-by-customErrorHandler');
} catch (e) {
  window.Sentry.captureException(e);
}
```

gets compiled to:

```js
try {
  throw new Error('catch-by-has-logger-customErrorHandler');
} catch (e) {
  window.handleErrorReporter(e);
}

try {
  throw new Error('catch-with-window-logger-by-customErrorHandler');
} catch (e) {
  window.Sentry.captureException(e);
}
```
