import { all, takeLatest } from 'redux-saga/effects';
import userSaga from './userSaga';
import sizeSaga from './sizeSaga';
import colorSaga from './colorSaga';

export default function* () {
    yield all([userSaga(), sizeSaga(), colorSaga()]);
}
