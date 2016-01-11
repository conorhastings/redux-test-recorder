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
      `import test from 'tape';
      let state = ${initState};
      const reducer = ${stringifiedReducer};
      const equality = ${equalityFunction};
      test('expected state returned for each action', assert => {
        const actions = ${JSON.stringify(actions, 4)};
        const returnExpectedState = actions.map((action) => {
          const result = reducer(state, action.action);
          state = result;
          return equality(result, action.nextState);
        });
        assert.ok(returnExpectedState.every(expected => expected), 'expected state returned for each action');
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
