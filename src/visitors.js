import { toArray, isCatchBlockHasLogger, isValidBabelOptions, getExpression } from './utils';

const setCatchClause = (path, state, babel) => {
  const { types: t, template } = babel;

  state.opts.exclude = toArray(state.opts.exclude);
  state.opts.include = toArray(state.opts.include);

  if (!isValidBabelOptions(path, state)) {
    return;
  }

  if (isCatchBlockHasLogger(path, state.opts, t)) {
    return;
  }

  const defaultErrorParam = 'error';
  const currentErrorParam = path.node.param;
  const errorParam = currentErrorParam ? currentErrorParam.name : defaultErrorParam;

  if (!currentErrorParam) {
    path.node.param = t.identifier(defaultErrorParam);
  }

  const expression = getExpression(errorParam, state.opts);

  const ast = template.ast(expression);
  path.node.body.body.unshift(ast);
};

export { setCatchClause };
