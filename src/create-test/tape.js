export default function createTapeTest({actions, imports, reducer, equalityFunction}) {
  return (`var test = require('tape');
${imports}
${reducer}
var equality = ${equalityFunction};

test('expected state returned for each action', function(assert) {
  var actions = ${JSON.stringify(actions, null, 2)};
  actions.forEach(function(action, index) {
    var result = reducer(action.prevState, action.action);
    assert.ok(equality(result, action.nextState), action.action.type + '(action index ' + index +') correctly updated state');
  });
  assert.end();
});`
  );
}