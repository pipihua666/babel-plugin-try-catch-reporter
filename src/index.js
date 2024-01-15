import { setCatchClause } from './visitors';

const babelPluginTryCatchReporter = (babel) => ({
  name: 'babel-plugin-try-catch-reporter',
  visitor: {
    CatchClause(path, state) {
      setCatchClause(path, state, babel);
    },
  },
});

export default babelPluginTryCatchReporter;
