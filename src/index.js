import Record from './record-component';

const reduxRecord = function(reducer, equality = (result, nextState) => result === nextState) { 
  let initState;
  let actions = [];
  let recording = false;
  const stringifiedReducer = reducer.toString();
  const equalityFunction = equality.toString();
  const startRecord = () => {
    recording = true;
  }
  const stopRecord = () => {
    recording = false;
  }
  const getRecordingStatus = () => recording;
  const recordingProps = { getRecordingStatus, startRecord, stopRecord };
  const getTests = () => {
    return `
      import test from 'tape';
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
      });
    `;
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
  return { middleware, getTests, recordingProps };
};

export { Record as Record };
export default reduxRecord;
