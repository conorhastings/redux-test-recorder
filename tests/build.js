'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = 5;
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
  var actions = [{ "action": { "type": "INCREMENT", "payload": 6 }, "nextState": 6 }, { "action": { "type": "INCREMENT", "payload": 7 }, "nextState": 7 }, { "action": { "type": "INCREMENT", "payload": 8 }, "nextState": 8 }, { "action": { "type": "INCREMENT", "payload": 9 }, "nextState": 9 }, { "action": { "type": "INCREMENT", "payload": 10 }, "nextState": 10 }, { "action": { "type": "INCREMENT", "payload": 11 }, "nextState": 11 }, { "action": { "type": "INCREMENT", "payload": 12 }, "nextState": 12 }, { "action": { "type": "INCREMENT", "payload": 13 }, "nextState": 13 }, { "action": { "type": "INCREMENT", "payload": 14 }, "nextState": 14 }];
  var returnExpectedState = actions.map(function (action) {
    var result = reducer(state, action.action);
    state = result;
    return equality(result, action.nextState);
  });
  assert.ok(returnExpectedState.every(function (expected) {
    return expected;
  }), 'expected state returned for each action');
  assert.end();
});
