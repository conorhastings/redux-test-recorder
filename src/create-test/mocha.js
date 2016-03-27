export default function createMochaTest({state, actions, imports, reducer, equalityFunction}) {
  const its = actions.map((action, index) => {
    return `  it('${action.action.type} (action index ${index}) should correctly update state', function() {
    var action = actions[${index}];
    var result = reducer(state, action.action);
    state = result;
    assert.ok(equality(result, action.nextState));
  });
`
  }).join('\n');
  return (`var assert = require('assert');
${imports}
${reducer}

var equality = ${equalityFunction};

describe('redux reducer test', function() {
  var state;
  var actions;
  before(function() {
    state = ${state};
    actions = ${JSON.stringify(actions, null, 2)};
  });

  after(function() {
    state = {};
    actions = [];
  });

${its}
});
`
  );
}