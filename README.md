## Redux Test Recorder

**NOTE YOUR STATE TREE MUST BE SERIALIZABLE**

Redux test recorder is a redux middleware for automagically generating tests for your reducers based on the actions in your app. Currently I've written <a href="http://github.com/conorhastings/redux-test-recorder-react">redux-test-recorder-react</a> a component to provide a gui for recording tests in react but I'm hopeful recording components for other frameworks can be created in the future.

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
export const store = createStore(reducer, applyMiddleware(record.middleware));
export const recordProps = record.props;
```

Then, if you are using with React you can install <a href="http://github.com/conorhastings/redux-test-recorder-react">redux-test-recorder-react</a> and import the recordProps exported by the instantiation of the middleware and pass those into the record component. 

```js
import {store, recordProps } from './store';
import TestRecorder from 'redux-test-recorder-react';
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

* **reducer** - the root reducer of your redux app, used in the generated test.
* **includeReducer** - a boolean value, if true, a stringified version of your reducer will be incuded in your generated test, if false, a note to import reducer for testing will be added. defaults to false. Useful when used to generate actual tests so you can test updated functionality.
* **stateKey(*optional*)** - if instead of recording the whole state you only want to record a specific piece, pass that here (useful with `actionSubset` prop explained next).
* **actionSubset(*optional*)** - allows you to record against a subset of actions instead of all actions. Useful combined with `stateKey` to test a single reducer.
* **equality(*optional*)** - a function used to determine if the reducer returned correct state. Receives result of the reducer call and nextState returned during the flow of the application (**note, this api is in flux**). deafults to `===`. This argument can *also* be a *string*. This is useful if you want to call a function you will include in your test file, since calling external functions will not properly stringify that external function. 
* **imports(*optional*)**` - a string argument where you can pass in other modules that you would like included iny our test file. Useful if you want to reference external functions in your equality check.
* **testLib(*optional*)** - defaults to `tape`. Currently supports `tape`, `ava`, and `mocha`. You can also optionally supply a function to this argument to generate your own tests. Will receive `state, actions, imports, reducer, equalityFunction` as arguments and expects return type to be a string containing your test contents.
* **numTestsToSave(*optional*, defaults to 5)** - number of previous tests that will be accessible in the panel when tests are being displayed. Higher number = newer.

### Create Your Own Testing Interface

If you're not satisfied with the built in testing interface or would like to experiment with something different, it's relatively straightforward. The return of the exported function is an object with two keys `middleware` and `props`. The `middleware` key contains, well, the middleware, `props` contains information for accessing the current state of the tests. These include `startRecord`, `stopRecord` , which are functions that start and stop test recording. `createNewTest` which creates and then returns a new test, `hideTest` , which resets all values to initial value, and most importantly `listen` , a function that takes a function and calls `listeners` any time any values related to recording status or generated tests is changed. More documentation on this coming soon. 

You can take a look at what creating your own interface looks like here - <a href='https://github.com/conorhastings/redux-test-recorder/blob/master/src/create-test/tape.js'>here</a> for what this looks like for the tape implementation.

