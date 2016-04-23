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
    if (index === null || index === undefined) {
      const test = (
        genTest({
          actions,
          imports,
          equalityFunction,
          reducer: stringifiedReducer,
          testLib: testLib
        })
      );
      let testIndex = prevTests.indexOf(test);
      const isNew = testIndex === -1;
      if (isNew) {
        if (prevTests.length === numTestsToSave) {
          prevTests = prevTests.slice(1, prevTests.length);
        }
        prevTests.push(test);
        index = prevTests.length - 1;
      }
      else {
        index = testIndex;
      }
    }
    return prevTests[index];
  };

  const getNumTests = () => prevTests.length;

  const middleware = ({getState}) => (next) => (action) => {
    if (recording) {
      const prevState = stateKey ? getState()[stateKey] : getState();
      next(action);
      const nextState = stateKey ? getState()[stateKey] : getState();
      if (!actionSubset || actionSubset[action.type]) {
        actions.push({action, prevState, nextState});
      }
    }
    else {
      next(action);
    }
  };
  const props = { getRecordingStatus, startRecord, stopRecord, getTest, shouldShowTest, hideTest, getNumTests };
  return { middleware, props };
};
export { TestRecorder as TestRecorder };
export default reduxRecord;
