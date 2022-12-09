import { all, takeLatest } from 'redux-saga/effects';
import userSaga from './userSaga';
import productSaga from './productSaga';
import categorySaga from './categorySaga';

export default function* () {
    yield all([userSaga(), productSaga(), categorySaga()]);
}
