import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiCreatePromo, apiGetAllPromo, apiEnablePromo, apiDisablePromo } from '~/app-data/promo';
import {
    CREATE_PROMO,
    CREATE_PROMO_FAIL,
    CREATE_PROMO_SUCCESS,
    DISABLE_PROMO,
    DISABLE_PROMO_FAIL,
    DISABLE_PROMO_SUCCESS,
    ENABLE_PROMO,
    ENABLE_PROMO_FAIL,
    ENABLE_PROMO_SUCCESS,
    GET_ALL_PROMO,
    GET_ALL_PROMO_FAIL,
    GET_ALL_PROMO_SUCCESS,
} from './action';

function* handleCreatePromo({ type, payload }) {
    try {
        const response = yield call(apiCreatePromo, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(CREATE_PROMO_SUCCESS(response.data));
        } else {
            yield put(CREATE_PROMO_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleGetAllPromo({ type, payload }) {
    try {
        const response = yield call(apiGetAllPromo, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_ALL_PROMO_SUCCESS(response.data));
        } else {
            yield put(GET_ALL_PROMO_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleEnablePromo({ type, payload }) {
    try {
        const response = yield call(apiEnablePromo, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ENABLE_PROMO_SUCCESS(response.data));
        } else {
            yield put(ENABLE_PROMO_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleDisablePromo({ type, payload }) {
    try {
        const response = yield call(apiDisablePromo, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(DISABLE_PROMO_SUCCESS(response.data));
        } else {
            yield put(DISABLE_PROMO_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* productSaga() {
    yield takeLatest(CREATE_PROMO().type, handleCreatePromo);
    yield takeLatest(GET_ALL_PROMO().type, handleGetAllPromo);
    yield takeLatest(ENABLE_PROMO().type, handleEnablePromo);
    yield takeLatest(DISABLE_PROMO().type, handleDisablePromo);
}
