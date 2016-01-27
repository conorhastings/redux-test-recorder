import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxRecord from '../dist';

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

const record = reduxRecord({reducer});
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
const record2 = reduxRecord({reducer: add, stateKey: 'add', actionSubset: ['INCREMENT']});
const createStoreWithMiddleware2 = applyMiddleware(record2.middleware)(createStore);
const store2 = createStoreWithMiddleware2(combined);
record2.props.startRecord();
store2.dispatch(increment());
store2.dispatch(increment());
store2.dispatch(increment());
store2.dispatch(decrement());
eval(record2.props.getTest());
