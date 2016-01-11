import TestRecorder from './test-recorder';

const reduxRecord = function(reducer, equality = (result, nextState) => result === nextState) { 
  let initState;
  let actions = [];
  let recording = false;
  let showingTest = false;
  const stringifiedReducer = reducer.toString();
  const equalityFunction = equality.toString();
  const startRecord = () => recording = true;
  const stopRecord = () =>  {
    recording = false;
    showingTest = true;
  }
  const getRecordingStatus = () => recording;
  const shouldShowTest = () => showingTest;
  const hideTest = () => {
    actions = [];
    showingTest = false;
    initState = undefined;
  }
  const getTest = () => {
    return (
      `var test = require('tape');
      var state = ${initState};
      var reducer = ${stringifiedReducer};
      var equality = ${equalityFunction};
      test('expected state returned for each action', function(assert) {
        var actions = ${JSON.stringify(actions, 4)};
        var returnExpectedState = actions.map(function (action) {
          var result = reducer(state, action.action);
          state = result;
          return equality(result, action.nextState);
        });
        assert.ok(returnExpectedState.every(function(expected) { return expected }), 'expected state returned for each action');
        assert.end();
      });`
    );
  }
  const middleware = ({getState}) => (next) => (action) => {
    if (initState === undefined) {
      initState = getState();
    }
    next(action);
    if (recording) {
      const nextState = getState();
      actions.push({action, nextState});
    }
  };
  const props = { getRecordingStatus, startRecord, stopRecord, getTest, shouldShowTest, hideTest };
  return { middleware, props };
};
export { TestRecorder as TestRecorder };
export default reduxRecord;
