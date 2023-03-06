import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiGetAllUsers, apiUpdateUser } from '~/app-data/users';
import {
    GET_ALL_USERS,
    GET_ALL_USERS_FAIL,
    GET_ALL_USERS_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
} from './action';

function* handleGetAllUsers({ type, payload }) {
    try {
        const response = yield call(apiGetAllUsers, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_ALL_USERS_SUCCESS(response.data));
        } else {
            yield put(GET_ALL_USERS_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleUpdateUser({ type, payload }) {
    try {
        const response = yield call(apiUpdateUser, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(UPDATE_USER_SUCCESS(response.data));
        } else {
            yield put(UPDATE_USER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* productSaga() {
    yield takeLatest(UPDATE_USER().type, handleUpdateUser);
    yield takeLatest(GET_ALL_USERS().type, handleGetAllUsers);
}
