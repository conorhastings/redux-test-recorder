import createTapeTest from './tape';
import createAvaTest from './ava';
import createMochaTest from './mocha';

const libToTestCreation = {
  'tape': createTapeTest,
  'ava': createAvaTest,
  'mocha': createMochaTest
};

export default function createTest({testLib, state, actions, imports, reducer, equalityFunction}) {
  return libToTestCreation[testLib](arguments[0]);
}