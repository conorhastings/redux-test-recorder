export default function createTapeTest({actions, imports, reducer, equalityFunction}) {
  const asserts = actions.map((action, index) => {
    return `test('${action.action.type} (action index ${index}) should correctly update state', function(assert) {
    var action = actions[${index}];
    var result = reducer(action.prevState, action.action);
    assert.ok(equality(result, action.nextState), 'state updated correctly');
    assert.end();
  });`}).join('\n\n');
  return (`var test = require('tape');
${imports}
${reducer}
var equality = ${equalityFunction};
var actions = ${JSON.stringify(actions, null, 2)};

${asserts}`
  );
}