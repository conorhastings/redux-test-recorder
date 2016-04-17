export default function createAvaTest({state, actions, imports, reducer, equalityFunction, stateParser}) {
  state = stateParser ? `${stateParser}(${state})` : state;
  const nextStateString = stateParser ? `${stateParser}(action.nextState)` : 'action.nextState';
  const asserts = actions.map((action, index) => {
    return `test('${action.action.type} (action index ${index}) should correctly update state', function(t) {
    var action = actions[${index}];
    var result = reducer(state, action.action);
    state = result;
    t.ok(equality(result, ${nextStateString}));
  });`}).join('\n\n');
  return (`var test = require('ava');
${imports}
${reducer}
var equality = ${equalityFunction};
var actions = ${JSON.stringify(actions, null, 2)};
var state = ${state};

${asserts}`);
}
