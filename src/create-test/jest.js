export default function createJestTest({actions, imports, reducer, equalityFunction}) {
  const its = actions.map((action, index) => {
    return `  it('${action.action.type} (action index ${index}) should correctly update state', function() {
  var action = actions[${index}];
  var result = reducer(active.prevState, action.action);
  expect(equality(result, action.nextState)).toBe(true);
});
`
  }).join('\n');
  return (`${imports}
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