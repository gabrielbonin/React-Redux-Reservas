import { call, put, all, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess } from './actions';
import api from '../../../services/api';

function* addToReserve({ id }){
    const response = yield call(api.get, `trips/${id}` );

    yield put(addReserveSuccess(response.data))
}

export default all([
  takeLatest('ADD_RESERVE_REQUEST', addToReserve)
])