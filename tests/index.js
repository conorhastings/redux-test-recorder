import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxRecord from '../dist';
import test from 'tape';

const increment = () => {
  return {type: 'INCREMENT'};
}

const decrement = () => {
  return {type: 'DECREMENT'};
}

const initState = 0;

const reducer = (state = initState, { type, payload }) => {
  let newState;
  switch (type) {
    case 'INCREMENT':
      newState = state + 1;
      break;
    case 'DECREMENT':
      newState = state - 1;
      break;
    default:
      newState = state;
  }
  return newState;
}

const record = reduxRecord({reducer, includeReducer: true});
const createStoreWithMiddleware = applyMiddleware(record.middleware)(createStore);
const store = createStoreWithMiddleware(reducer);
record.props.startRecord();
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
eval(record.props.getTest());

const initState2 = {
  add: 0,
  subtract: 0
}
const add = (state = initState2.add, { type, payload }) => {
  let newState;
  switch (type) {
    case 'INCREMENT':
      newState = state + 1;
      break;
    default:
      newState = state;
  }
  return newState;
}

const subtract = (state = initState2.subtract, { type, payload }) => {
  let newState;
  switch (type) {
    case 'DECREMENT':
      newState = state - 1;
      break;
    default:
      newState = state;
  }
  return newState;
}
const combined = combineReducers({add, subtract});
const record2 = reduxRecord({reducer: add, includeReducer: true, stateKey: 'add', actionSubset: { INCREMENT: 'INCREMENT' }});
const createStoreWithMiddleware2 = applyMiddleware(record2.middleware)(createStore);
const store2 = createStoreWithMiddleware2(combined);
record2.props.startRecord();
store2.dispatch(increment());
store2.dispatch(increment());
store2.dispatch(increment());
store2.dispatch(decrement());
eval(record2.props.getTest());

const record3 = reduxRecord({
  reducer: add, 
  includeReducer: false 
});

test('reducer not included when includeReducer = false', assert => {
  assert.plan(1);
  const generatedTest = record3.props.getTest();
  assert.ok(generatedTest.includes('/* import reducer from YOUR_REDUCER_LOCATION_HERE */'), "test includes note to import reducer");
});

test ('startRecord makes getRecordingStatus return true, and calling stop makes false', assert => {
  assert.plan(2);
  record3.props.startRecord();
  assert.ok(record3.props.getRecordingStatus(), 'getRecordingStatus is true after start');
  record3.props.stopRecord();
  assert.notOk(record3.props.getRecordingStatus(), 'getRecordingStatus is false after stop');
});

test('shouldShowTest is true after stopRecord is fired and false after hideTest is fired', assert => {
  assert.plan(2);
  record3.props.stopRecord();
  assert.ok(record3.props.shouldShowTest(), 'should show test after stopRecord is fired');
  record3.props.hideTest();
  assert.notOk(record3.props.shouldShowTest(), 'should hide test after hideTest is fired');
});

const record4 = reduxRecord({
  reducer: add, 
  imports: `var equal = reqire('deep-equal');` 
});


test('extra imports are included when import arg is given', assert => {
  assert.plan(1);
  const generatedTest = record4.props.getTest();
  assert.ok(generatedTest.includes(`var equal = reqire('deep-equal');`), "test includes additional imports");
});
