import createTapeTest from './tape';

const libToTestCreation = {
  'tape': createTapeTest
};

export default function createTest({testLib, state, actions, imports, reducer, equalityFunction}) {
  return libToTestCreation[testLib](arguments[0]);
}