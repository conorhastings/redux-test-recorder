import createTest, { isTestLibrarySupported } from './create-test';
import TestRecorder from './test-recorder';

const reduxRecord = function({
  reducer, 
  includeReducer = false, 
  stateKey,
  actionSubset,
  equality = '(result, nextState) => result === nextState',
  imports = '',
  testLib = 'tape',
  numTestsToSave = 5
}) { 
  let initState;
  let actions = [];
  let recording = false;
  let showingTest = false;
  let prevTests = [];
  let stringifiedReducer = '/* import reducer from YOUR_REDUCER_LOCATION_HERE */';
  if (includeReducer) {
    stringifiedReducer = `var reducer = ${reducer.toString()}`;
  }
  // we can skip type checking to see if equality arg is a string since string.toString() returns same string
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
  };
  const genTest = typeof testLib === 'function' ? testLib : createTest;
  if (typeof testLib !== 'string' && typeof testLib !== 'function') {
    throw new Error('testLib argument must be a string or a function');
  }
  if (typeof testLib === 'string' && !isTestLibrarySupported(testLib)) {
    throw new Error('testLib argument does not contain a supported testing library. ' + 
      'Feel free to make a pr adding support or use a custom test generation function for testLib arg');
  }

  const getTest = (index) => {
    if (prevTests.length === numTestsToSave) {
      prevTests = prevTests.slice(1, prevTests.length);
    }
    const newTest = (
      genTest({
        actions,
        imports,
        equalityFunction,
        state: initState,
        reducer: stringifiedReducer,
        testLib: testLib
      })
    );
    prevTests.push(newTest);
    index = index || prevTests.length - 1;
    return prevTests[index];
  };

  const middleware = ({getState}) => (next) => (action) => {
    if (initState === undefined && recording) {
      initState = stateKey ? getState()[stateKey] : getState();
      if (typeof initState === 'object') {
        initState = JSON.stringify(initState, null, 4);
      }
    }
    next(action);
    if (recording) {
      const nextState = stateKey ? getState()[stateKey] : getState();
      if (!actionSubset || actionSubset[action.type]) {
        actions.push({action, nextState});
      }
    }
  };
  const props = { getRecordingStatus, startRecord, stopRecord, getTest, shouldShowTest, hideTest };
  return { middleware, props };
};
export { TestRecorder as TestRecorder };
export default reduxRecord;
