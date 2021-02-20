import { select, call, put, all, takeLatest } from 'redux-saga/effects'; 
//call requisicoes http saga. 
//yield await do generator
//put actions dentro do saga
//all listeners
//takeLatest executa a ultima requisição através do clique
import { addReserveSuccess, updateAmountSuccess } from './actions';
import api from '../../../services/api';
import history from '../../../services/history';

function* addToReserve({ id }){

  const tripeExists = yield select(
    state => state.reserve.find(trip => trip.id === id)
  );

  //estoque
    const myStock = yield call(api.get, `/stock/${id}`);
    const stockAmount = myStock.data.amount;
    const currentStock = tripeExists ? tripeExists.amount : 0;
    const amount = currentStock + 1;

    if(amount > stockAmount){
      alert("reservas esgotadas");
      return;
    }

    if(tripeExists){
      //add amount sem req

      const amount = tripeExists.amount +1;

      yield put(updateAmountSuccess(id, amount));

    }
    else{
      const response = yield call(api.get, `trips/${id}` );
      const data = {
        ...response.data,
        amount: 1,
      }
      yield put(addReserveSuccess(data))
      history.push('/reservas');
    }

}

function* updateAmount({id, amount}){
  if(amount <= 0) return;
  const myStock = yield call(api.get, `/stock/${id}`);

  const stockAmount = myStock.data.amount;

  if(amount > stockAmount){
    alert("esgotado");
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('ADD_RESERVE_REQUEST', addToReserve),
  takeLatest('UPDATE_RESERVE_REQUEST', updateAmount)
])