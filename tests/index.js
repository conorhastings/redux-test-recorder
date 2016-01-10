      import test from 'tape';
      let initState = 0;
      const reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initState : arguments[0];
    var _ref = arguments[1];
    var type = _ref.type;
    var payload = _ref.payload;
  
    var newState = undefined;
    switch (type) {
      case 'INCREMENT':
      case 'DECREMENT':
        newState = payload;
        break;
      default:
        newState = state;
    }
    return newState;
  };
      const equality = function (result, nextState) {
      return result === nextState;
    };
      test('expected state returned for each action', assert => {
        const actions = [{"action":{"type":"INCREMENT","payload":1},"nextState":1},{"action":{"type":"INCREMENT","payload":2},"nextState":2}];
        const returnExpectedState = actions.map((action) => {
          const result = reducer(initState, action.action);
          initState = result;
          return equality(result, action.nextState);
        });
        assert.ok(returnExpectedState.every(expected => expected), 'expected state returned for each action');
        assert.end();
      });