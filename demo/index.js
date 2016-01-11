import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';
import { render } from 'react-dom';
import reduxRecord from '../dist';
import { TestRecorder } from '../dist';

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

const Counter = ({count, dispatch}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  };
  const buttonStyle = {
    width: 200,
    height: 100,
    border: 'none',
    backgroundColor: 'aliceblue',
    color: '#888888',
    cursor: 'pointer',
    fontSize: 36,
    fontWeight: 700
  };
  const h1Style = {
    fontSize: 42,
    color: 'aliceblue'
  }
  const pStyle = {
    fontWeight: 300,
    fontSize: 22,
    color: 'aliceblue'
  }
  return (
    <div style={style}>
      <p style={pStyle}>To Use, press record button, interact with counter, and press record again</p>
      <button style={buttonStyle} onClick={() => dispatch(increment())}>+</button>
      <h1 style={h1Style}>{count}</h1>
      <button style={buttonStyle} onClick={() => dispatch(decrement())}>-</button>
      <TestRecorder {...record.props} />
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