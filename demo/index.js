import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';
import { render } from 'react-dom';
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
window.tests = record.getTests;
const createStoreWithMiddleware = applyMiddleware(record.middleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const Counter = ({count, dispatch}) => {
  return (
    <div>
      <button onClick={() => dispatch(increment(count))}>+</button>
      <h1>{count}</h1>
      <button onClick={() => dispatch(decrement(count))}>-</button>
    </div>
  );
}

const ConnectedCounter = connect(state => {
  return {count: state};
})(Counter);

const Root = () => {
  return <div><Provider store={store}><ConnectedCounter /></Provider></div>;
}

render(<Root />, document.getElementById('app'));