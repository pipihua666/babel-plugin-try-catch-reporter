import * as constants from './constants';

const isObject = (opts) => Object.prototype.toString.call(opts) === '[object Object]';

const isString = (opts) => Object.prototype.toString.call(opts) === '[object String]';

const toArray = (value) => {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return [...value];
  }
  if (isString(value)) {
    return value.includes(',') ? value.split(',') : [value];
  }
  return [];
};

const isMatchFileName = (files, currentFileName) =>
  files.some((file) => currentFileName.includes(file));

const isHasRequiredOptions = (pluginOptions) =>
  constants.requiredPluginOptions.every((option) => !!pluginOptions[option]);

const isValidBabelOptions = (path, state) => {
  const currentFileName = state.filename || state.file.opts.filename;

  if (!currentFileName) {
    throw path.buildCodeFrameError('file does not exist');
  }
  const pluginOptions = state.opts;

  if (!pluginOptions || !isObject(pluginOptions)) {
    throw path.buildCodeFrameError(
      '[babel-plugin-try-catch-reporter]：options need to be an object.',
    );
  }

  if (!isHasRequiredOptions(pluginOptions)) {
    throw path.buildCodeFrameError(
      `[babel-plugin-try-catch-reporter]：${constants.requiredPluginOptions.join(
        ',',
      )} are required`,
    );
  }

  if (
    pluginOptions.customErrorHandler &&
    !pluginOptions.customErrorHandler.startsWith(constants.windowObject)
  ) {
    throw path.buildCodeFrameError(
      `[babel-plugin-try-catch-reporter]：customErrorHandler must start with ${constants.windowObject}`,
    );
  }

  const excludeFiles = [...pluginOptions.exclude, ...constants.extraExcludeDirectory];
  if (isMatchFileName(excludeFiles, currentFileName)) {
    return false;
  }

  if (pluginOptions.include.length && !isMatchFileName(pluginOptions.include, currentFileName)) {
    return false;
  }

  return true;
};

const isCatchBlockHasLogger = (outerPath, pluginOptions, babelTypes) => {
  const { loggerMethod, customErrorHandler } = pluginOptions;
  let hasLogger = false;
  // 去除 window. 前缀进行校验
  const windowPropertyStartIndex = constants.windowObject.length;
  const errorHandler = customErrorHandler && customErrorHandler.slice(windowPropertyStartIndex);
  outerPath.traverse({
    MemberExpression(innerPath) {
      // 跳过已有的捕获或者自定义错误出处理函数
      if (
        babelTypes.isIdentifier(innerPath.node.property, { name: loggerMethod }) ||
        (errorHandler && babelTypes.isIdentifier(innerPath.node.property, { name: errorHandler }))
      ) {
        hasLogger = true;
        innerPath.stop();
      }
    },
  });

  return hasLogger;
};

const getExpression = (errorParam, pluginOptions) => {
  const { customErrorHandler, loggerName, loggerMethod } = pluginOptions;
  if (customErrorHandler) {
    return `${customErrorHandler}(${errorParam})`;
  }
  return `${loggerName}.${loggerMethod}(${errorParam})`;
};

export { toArray, isCatchBlockHasLogger, isValidBabelOptions, getExpression, isString };
