import { all, takeLatest } from 'redux-saga/effects';
import userSaga from './userSaga';
import sizeSaga from './sizeSaga';

export default function* () {
    yield all([userSaga(), sizeSaga()]);
}
