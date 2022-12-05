import { all, takeLatest } from 'redux-saga/effects';
import userSaga from './userSaga';
import productSaga from './productSaga';

export default function* () {
    yield all([userSaga(), productSaga()]);
}
