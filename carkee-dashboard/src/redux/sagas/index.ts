import { all } from 'redux-saga/effects';
import authSage from './auth';

export default function* rootSaga() {
  yield all([authSage()]);
}
