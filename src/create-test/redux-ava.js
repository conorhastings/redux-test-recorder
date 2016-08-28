export default function createReduxAvaTest({actions, imports, reducer, equalityFunction}) {
  const asserts = actions.map((action, index) => {
    return `test('${action.action.type} (action index ${index}) should correctly update state', reducerTest(
  reducer,
  actions[${index}].prevState,
  actions[${index}].action,
  actions[${index}].nextState
));`}).join('\n\n');
  return (`var test = require('ava');
var reducerTest = require('redux-ava').reducerTest;
${imports}
${reducer}
var actions = ${JSON.stringify(actions, null, 2)};
${asserts}`);
}
