## Redux Test Recorder

**NOTE EXPERIMENTAL, API MAY CHANGE DRAMATICALLY**
**NOTE YOUR STATE TREE MUST BE SERIALIZABLE**

Redux test recorder is a redux middleware + included component for automagically generating tests for your reducers based on the actions in your app.

<a href="http://conorhastings.com/redux-test-recorder/demo/index.html">Click here for a demo</a>

<img src='http://i.imgur.com/RUaEhkC.gif' />

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
export const store = createStoreWithMiddleware(reducer);
export const recordProps = record.props;
```

Then at the component level include `redux-test-recorder` at the root.

```js
import {store, recordProps } from './store';
import { TestRecorder } from 'redux-test-recorder';
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
* `equality` - a function used to determine if the reducer returned correct state. Receives result of the reducer call and nextState returned during the flow of the application (**note, this api is in flux**).


