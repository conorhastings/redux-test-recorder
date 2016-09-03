import tape from './tape';
import ava from './ava';
import mocha from './mocha';
import reduxAva from './redux-ava';
import jest from './jest';

const libToTestCreation = {
  tape,
  ava,
  mocha,
  reduxAva,
  jest
};

export const isTestLibrarySupported = (lib) => Object.keys(libToTestCreation).indexOf(lib) !== -1;

export default function createTest({testLib, state, actions, imports, reducer, equalityFunction}) {
  return libToTestCreation[testLib](arguments[0]);
}