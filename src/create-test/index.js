import createTapeTest from './tape';
import createAvaTest from './ava';
import createMochaTest from './mocha';
import createReduxAvaTest from "./redux-ava";

const libToTestCreation = {
  tape: createTapeTest,
  ava: createAvaTest,
  mocha: createMochaTest,
  reduxAva: createReduxAvaTest
};

export const isTestLibrarySupported = (lib) => Object.keys(libToTestCreation).indexOf(lib) !== -1;

export default function createTest({testLib, state, actions, imports, reducer, equalityFunction}) {
  return libToTestCreation[testLib](arguments[0]);
}