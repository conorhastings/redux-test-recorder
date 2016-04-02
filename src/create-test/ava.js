export default function createAvaTest({state, actions, imports, reducer, equalityFunction}) {
  const asserts = actions.map((action, index) => {
    return `test('${action.action.type} (action index ${index}) should correctly update state', function(t) {
    var action = actions[${index}];
    var result = reducer(state, action.action);
    state = result;
    t.ok(equality(result, action.nextState));
  });`}).join('\n\n');
  return (`var test = require('ava');
${imports}
${reducer}
var equality = ${equalityFunction};
var actions = ${JSON.stringify(actions, null, 2)};
var state = ${state};

${asserts}`);
}
