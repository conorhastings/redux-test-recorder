import { createStore, applyMiddleware} from 'redux';
import reduxRecord from '../dist';

const increment = (num) => {
  return {type: 'INCREMENT', payload: num + 1};
}

const decrement = (num) => {
  return {type: 'DECREMENT', payload: num - 1};
}

const initState = 0;

const reducer = (state = initState, { type, payload }) => {
  let newState;
  switch (type) {
    case 'INCREMENT':
    case 'DECREMENT':
      newState = payload;
      break;
    default:
      newState = state;
  }
  return newState;
}

const record = reduxRecord(reducer);
const createStoreWithMiddleware = applyMiddleware(record.middleware)(createStore);
const store = createStoreWithMiddleware(reducer);
record.props.startRecord();
store.dispatch(increment(0));
store.dispatch(increment(1));
store.dispatch(increment(2));
store.dispatch(decrement(3));
eval(record.props.getTest());