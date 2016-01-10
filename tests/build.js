'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initState = 0;
var reducer = function reducer() {
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
var equality = function equality(result, nextState) {
  return result === nextState;
};
(0, _tape2.default)('expected state returned for each action', function (assert) {
  var actions = [{ "action": { "type": "INCREMENT", "payload": 1 }, "nextState": 1 }, { "action": { "type": "INCREMENT", "payload": 2 }, "nextState": 2 }];
  var returnExpectedState = actions.map(function (action) {
    var result = reducer(initState, action.action);
    initState = result;
    return equality(result, action.nextState);
  });
  assert.ok(returnExpectedState.every(function (expected) {
    return expected;
  }), 'expected state returned for each action');
  assert.end();
});
