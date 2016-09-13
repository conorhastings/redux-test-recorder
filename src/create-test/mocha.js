export default function createMochaTest({actions, imports, reducer, equalityFunction}) {
  const its = actions.map((action, index) => {
    return `  it('${action.action.type} (action index ${index}) should correctly update state', function() {
  var action = actions[${index}];
  var result = reducer(action.prevState, action.action);
  assert.ok(equality(result, action.nextState));
});
`
  }).join('\n');
  return (`var assert = require('assert');
${imports}
${reducer}

var equality = ${equalityFunction};

describe('redux reducer test', function() {
  var actions;
  before(function() {
    actions = ${JSON.stringify(actions, null, 2)};
  });

  after(function() {
    actions = [];
  });

${its}
});
`
  );
}
