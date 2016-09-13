import tape from './tape';
import ava from './ava';
import mocha from './mocha';
import reduxAva from './redux-ava';
import jest from './jest';
import mochaES6 from './mocha-chai-es6';

const libToTestCreation = {
  tape,
  ava,
  mocha,
  reduxAva,
  jest,
  mochaES6
};

export const isTestLibrarySupported = (lib) => Object.keys(libToTestCreation).indexOf(lib) !== -1;

export default function createTest({testLib, state, actions, imports, reducer, equalityFunction}) {
  return libToTestCreation[testLib](arguments[0]);
}
