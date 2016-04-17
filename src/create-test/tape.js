export default function createTapeTest({state, actions, imports, reducer, equalityFunction, stateParser}) {
  state = stateParser ? `${stateParser}(${state})` : state;
  const nextStateString = stateParser ? `${stateParser}(action.nextState)` : 'action.nextState';
  return (`var test = require('tape');
${imports}
${reducer}
var equality = ${equalityFunction};

test('expected state returned for each action', function(assert) {
  var state = ${state};
  var actions = ${JSON.stringify(actions, null, 2)};
  actions.forEach(function(action, index) {
    var result = reducer(state, action.action);
    state = result;
    assert.ok(equality(result, ${nextStateString}), action.action.type + '(action index ' + index +') correctly updated state');
  });
  assert.end();
});`
  );
}