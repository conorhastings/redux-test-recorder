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
  numTestsToSave = 5,
  includeShowTestsButton = false
}) { 
  let actions = [];
  let recording = false;
  let showingTest = false;
  let testIndex = undefined;
  let prevTests = [];
  let listeners = [];
  let stringifiedReducer = '/* import reducer from YOUR_REDUCER_LOCATION_HERE */';
  if (includeReducer) {
    stringifiedReducer = `var reducer = ${reducer.toString()}`;
  }

  const updateListeners = () => {
    if (listeners.length) {
      let newTestState = {
        recording,
        showingTest,
        tests: prevTests,
        testIndex
      }
      listeners.forEach(fn => fn(newTestState));
    }
  }
  
  // we can skip type checking to see if equality arg is a string since string.toString() returns same string
  const equalityFunction = equality.toString();
  const startRecord = () => {
    recording = true;
    updateListeners();
  };
  const stopRecord = () =>  {
    recording = false;
    showingTest = true;
    updateListeners();
  }

  const hideTest = () => {
    showingTest = false;
    updateListeners();
  };

  const showTest = () => {
    showingTest = true;
    updateListeners();
  };

  const emptyActions = () => {
    actions = [];
    updateListeners();
  };

  const updateTestIndex = (index) => {
    testIndex = index;
    updateListeners();
  }

  const genTest = typeof testLib === 'function' ? testLib : createTest;
  if (typeof testLib !== 'string' && typeof testLib !== 'function') {
    throw new Error('testLib argument must be a string or a function');
  }
  if (typeof testLib === 'string' && !isTestLibrarySupported(testLib)) {
    throw new Error('testLib argument does not contain a supported testing library. ' + 
      'Feel free to make a pr adding support or use a custom test generation function for testLib arg');
  }

  const createNewTest = () => {
    const test = (
      genTest({
        actions,
        imports,
        equalityFunction,
        reducer: stringifiedReducer,
        testLib: testLib
      })
    );
    if (prevTests.length === numTestsToSave) {
      prevTests = prevTests.slice(1, prevTests.length);
    }
    prevTests.push(test);
    testIndex = prevTests.length - 1;
    updateListeners();
  }

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

  const listen = (fn) => {
    listeners.push(fn);
    updateListeners();
    return () => listeners.splice(listeners.splice(listeners.indexOf(fn), 1));
  }
  const props = { 
    startRecord, 
    stopRecord, 
    createNewTest, 
    hideTest, 
    showTest,
    emptyActions,
    updateTestIndex,
    listen,
    includeShowTestsButton
  };
  return { middleware, props };
};
export { TestRecorder as TestRecorder };
export default reduxRecord;
