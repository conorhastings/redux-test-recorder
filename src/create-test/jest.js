export default function createJestTest({actions, imports, reducer, equalityFunction}) {
  const tests = actions.map((action, index) => {
    return `test('${action.action.type} (action index ${index}) should correctly update state', function() {
    var action = actions[${index}];
    var result = reducer(action.prevState, action.action);
    expect(equality(result, action.nextState)).toBe(true);
});
`}).join('\n');
  return (`/*jest style test */
${imports}
${reducer}

var equality = ${equalityFunction};
var actions = ${JSON.stringify(actions, null, 2)};

${tests}
`);
}
