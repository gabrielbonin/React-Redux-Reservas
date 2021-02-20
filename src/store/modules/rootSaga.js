import { all } from 'redux-saga/effects'; //combineSagas

import reserve from './reserve/sagas';

export default function* rootSaga(){
  return yield all([
    reserve,
  ])
}