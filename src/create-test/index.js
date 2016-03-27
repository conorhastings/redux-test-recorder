import createTapeTest from './tape';
import createAvaTest from './ava';

const libToTestCreation = {
  'tape': createTapeTest,
  'ava': createAvaTest
};

export default function createTest({testLib, state, actions, imports, reducer, equalityFunction}) {
  return libToTestCreation[testLib](arguments[0]);
}