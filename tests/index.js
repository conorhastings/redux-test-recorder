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

let state = {};
const record = reduxRecord({reducer, includeReducer: true});
const listen = record.props.listen(newState => state = newState);
const createStoreWithMiddleware = applyMiddleware(record.middleware)(createStore);
const store = createStoreWithMiddleware(reducer);
record.props.startRecord();
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
record.props.createNewTest();
record.props.stopRecord();
eval(state[0]);
record.props.hideTest();
record.props.startRecord();
store.dispatch(increment());
record.props.createNewTest();
record.props.stopRecord();
eval(state.tests[1]);
listen();

test("generates and stores multiple different tests", assert => {
  assert.notEqual(state.tests[0], state.tests[1]);
  assert.end();
});

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

let state2 = {};
const combined = combineReducers({add, subtract});
const record2 = reduxRecord({reducer: add, includeReducer: true, stateKey: 'add', actionSubset: { INCREMENT: 'INCREMENT' }});
const listen2 = record2.props.listen(newState => state2 = newState);
const createStoreWithMiddleware2 = applyMiddleware(record2.middleware)(createStore);
const store2 = createStoreWithMiddleware2(combined);
record2.props.startRecord();
store2.dispatch(increment());
store2.dispatch(increment());
store2.dispatch(increment());
store2.dispatch(decrement());
record2.props.createNewTest();
eval(state2.tests[0]);
listen2();

const record3 = reduxRecord({
  reducer: add, 
  includeReducer: false 
});

test('reducer not included when includeReducer = false', assert => {
  assert.plan(1);
  let state = {};
  const listen = record3.props.listen(s => state = s);
  record3.props.createNewTest();
  const generatedTest = state.tests[0];
  listen();
  assert.ok(generatedTest.includes('/* import reducer from YOUR_REDUCER_LOCATION_HERE */'), "test includes note to import reducer");
});

test ('startRecord makes getRecordingStatus return true, and calling stop makes false', assert => {
  assert.plan(2);
  let state = {};
  const listen = record3.props.listen(s => state = s);
  record3.props.startRecord();
  assert.ok(state.recording, 'getRecordingStatus is true after start');
  record3.props.stopRecord();
  listen();
  assert.notOk(state.recording, 'getRecordingStatus is false after stop');
});

test('shouldShowTest is true after stopRecord is fired and false after hideTest is fired', assert => {
  assert.plan(2);
  let state = {};
  const listen = record3.props.listen(s => state = s);
  record3.props.stopRecord();
  assert.ok(state.showingTest, 'should show test after stopRecord is fired');
  record3.props.hideTest();
  listen();
  assert.notOk(state.showingTest, 'should hide test after hideTest is fired');
});

test('shouldShowTest is true after showTest is fired', assert => {
  assert.plan(1);
  let state = {};
  const listen = record3.props.listen(s => state = s);
  record3.props.showTest();
  listen();
  assert.ok(state.showingTest, 'should show test after stopRecord is fired');
});


test('extra imports are included when import arg is given', assert => {
  assert.plan(1);
  const record4 = reduxRecord({
    reducer: add, 
    imports: `var equal = reqire('deep-equal');` 
  });
  const generatedTest = record4.props.createNewTest();

  assert.ok(generatedTest.includes(`var equal = reqire('deep-equal');`), 'test includes additional imports');
});

test('it should generate a mocha test, when testLib arg === mocha', assert => {
  assert.plan(1);
  const record5 = reduxRecord({
    reducer: reducer, 
    testLib: 'mocha'
  });
  const generatedTest = record5.props.createNewTest();
  assert.ok(generatedTest.includes('describe'), 'generated tested is in mocha style');
});

test('it should generate an ava test, when testLib arg === ava', assert => {
  assert.plan(1);
  const record6 = reduxRecord({
    reducer: reducer, 
    testLib: 'ava'
  });
  const generatedTest = record6.props.createNewTest();
  assert.ok(generatedTest.includes('ava'), 'generated tested is in ava style');
});

test('it should generate a tape test, when testLib arg is not supplied', assert => {
  assert.plan(1);
  const record7 = reduxRecord({
    reducer: reducer
  });
  const generatedTest = record7.props.createNewTest();
  assert.ok(generatedTest.includes('tape'), 'generated tested is in tape style');
});

test('it should generate a tape test, when testLib arg is tape', assert => {
  assert.plan(1);
  const record8 = reduxRecord({
    reducer: reducer,
    testLib: 'tape'
  });
  const generatedTest = record8.props.createNewTest();
  assert.ok(generatedTest.includes('tape'), 'generated tested is in tape style');
});

test('it should use a custom test generation function when arg supplied to testLib is function not string', assert => {
  assert.plan(1);
  const record8 = reduxRecord({
    reducer: reducer,
    testLib: () => 'custom test'
  });
  const generatedTest = record8.props.createNewTest();
  assert.equal(generatedTest, 'custom test','generated tested is in custom style');
});

test('it should throw an error if testLib arg is not string or function', assert => {
  assert.plan(1);
  assert.throws(() => (
    reduxRecord({
      reducer: reducer,
      testLib: {}
    })
  ), 'testLib argument must be a string or a function');
});

test('it should throw an error if testLib arg is string and not currently supported lib', assert => {
  assert.plan(1);
  assert.throws(() => (
    reduxRecord({
      reducer: reducer,
      testLib: 'faketestlibrary'
    }, 'testLib argument does not contain a supported testing library. Feel free to make a pr adding support or use a custom test generation function for testLib arg')
  ));
});