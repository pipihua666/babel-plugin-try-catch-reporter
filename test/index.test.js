import pluginTester from 'babel-plugin-tester';
import path from 'path';
import babelPluginTryCatchReporter from '../src';

pluginTester({
  plugin: babelPluginTryCatchReporter,
  pluginName: 'babel-plugin-try-catch-reporter',
  title: 'test plugin',
  pluginOptions: {
    loggerName: 'window.Sentry',
    loggerMethod: 'captureException',
  },
  // 使用 jest 的 snapshot
  snapshot: true,
  // 读取的目录
  fixtures: path.join(__dirname, '__fixtures__'),
});
