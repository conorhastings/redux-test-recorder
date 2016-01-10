const reduxRecord = function(reducer, equality = (result, nextState) => result === nextState) { 
  let initState;
  let actions = [];
  const stringifiedReducer = reducer.toString();
  const equalityFunction = equality.toString();
  const getTests = () => {
    return `
      import test from 'tape';
      let initState = ${initState};
      const reducer = ${stringifiedReducer};
      const equality = ${equalityFunction};
      test('expected state returned for each action', assert => {
        const actions = ${JSON.stringify(actions, 4)};
        const returnExpectedState = actions.map((action) => {
          const result = reducer(initState, action.action);
          initState = result;
          return equality(result, action.nextState);
        });
        assert.ok(returnExpectedState.every(expected => expected), 'expected state returned for each action');
        assert.end();
      });
    `;
  }
  const middleware = ({getState}) => (next) => (action) => {
    if (initState === undefined) {
      initState = getState();
    }
    next(action);
    const nextState = getState();
    actions.push({action, nextState});
  };
  return { middleware, getTests };
};

export default reduxRecord;