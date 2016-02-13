## Redux Test Recorder

**NOTE EXPERIMENTAL, API MAY CHANGE DRAMATICALLY**
**NOTE YOUR STATE TREE MUST BE SERIALIZABLE**

Redux test recorder is a redux middleware + included component for automagically generating tests for your reducers based on the actions in your app.

[![Build Status](https://travis-ci.org/conorhastings/redux-test-recorder.svg?branch=master)](https://travis-ci.org/conorhastings/redux-test-recorder)

<a href="http://conorhastings.com/redux-test-recorder/demo/index.html">Click here for a demo</a>. 
<a href="http://conorhastings.com/todo-mvc-redux-test-recorder/">And here for another demo with TodoMVC</a>

Also take a look at our <a href="https://travis-ci.org/conorhastings/redux-test-recorder">latest build</a> which currently runs a test generated using this module by taking advantage of the `eval` command. For a better idea of what is going on, you can take a look at the <a href="https://github.com/conorhastings/redux-test-recorder/blob/master/tests/index.js">test file here</a>.

<img src='http://i.imgur.com/TUMGnnb.gif' />

### Install

`npm install redux-test-recorder --save-dev`

### Use

First set up your store utilizing the exported middleware from `redux-test-recorder`. Export the props included with `redux-test-recorder` at this time as well. 

```js
import reduxRecord from 'redux-test-recorder';
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
export const store = createStoreWithMiddleware(reducer, applyMiddleware(record.middleware));
export const recordProps = record.props;
```

Then at the component level include `redux-test-recorder` at the root.

```js
import {store, recordProps } from './store';
import { TestRecorder } from 'redux-test-recorder';
const Counter = ({count, dispatch}) => {
  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <h1>{count}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

const ConnectedCounter = connect(state => {
  return {count: state};
})(Counter);
const Root = () => {
  return (
    <div>
      <Provider store={store}>
        <div><ConnectedCounter /><TestRecorder {...recordProps} /></div>
      </Provider>
    </div>;
};
```
This will allow you to generate tests on your reducer with a record button in the bottom right corner.

### Args

* `reducer` - the root reducer of your redux app, used in the generated test.
* `includeReducer` - a boolean value, if true, a stringified version of your reducer will be incuded in your generated test, if false, a note to import reducer for testing will be added. defaults to true. Useful when used to generate actual tests so you can test updated functionality.
* `stateKey(*optional*)` - if instead of recording the whole state you only want to record a specific piece, pass that here (useful with `actionSubset` prop explained next).
* `actionSubset(*optional*)` - allows you to record against a subset of actions instead of all actions. Useful combined with `stateKey` to test a single reducer.
* `equality(*optional*)` - a function used to determine if the reducer returned correct state. Receives result of the reducer call and nextState returned during the flow of the application (**note, this api is in flux**). deafults to `===`. This argument can *also* be a *string*. This is useful if you want to call a function you will include in your test file, since calling external functions will not properly stringify that external function. 
* `imports(*optional*)` - a string argument where you can pass in other modules that you would like included iny our test file. Useful if you want to reference external functions in your equality check.


