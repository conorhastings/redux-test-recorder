import { createStore, applyMiddleware} from 'redux';
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

const record = reduxRecord(reducer);
const createStoreWithMiddleware = applyMiddleware(record.middleware)(createStore);
const store = createStoreWithMiddleware(reducer);
record.props.startRecord();
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
eval(record.props.getTest());