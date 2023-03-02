import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiGetAllOrder, apiCancelOrder, apiApproveOrder, apiDeliveringOrder } from '~/app-data/order';
import {
    APPROVE_ORDER,
    APPROVE_ORDER_FAIL,
    APPROVE_ORDER_SUCCESS,
    CANCEL_ORDER,
    CANCEL_ORDER_FAIL,
    CANCEL_ORDER_SUCCESS,
    DELIVERING_ORDER,
    DELIVERING_ORDER_FAIL,
    DELIVERING_ORDER_SUCCESS,
    GET_ALL_ORDER,
    GET_ALL_ORDER_FAIL,
    GET_ALL_ORDER_SUCCESS,
} from './action';

function* handleGetAllOrder({ type, payload }) {
    try {
        const response = yield call(apiGetAllOrder, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_ALL_ORDER_SUCCESS(response.data));
        } else {
            yield put(GET_ALL_ORDER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleApproveOrder({ type, payload }) {
    try {
        const response = yield call(apiApproveOrder, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(APPROVE_ORDER_SUCCESS(response.data));
        } else {
            yield put(APPROVE_ORDER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleDeliveringOrder({ type, payload }) {
    try {
        const response = yield call(apiDeliveringOrder, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(DELIVERING_ORDER_SUCCESS(response.data));
        } else {
            yield put(DELIVERING_ORDER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleCancelOrder({ type, payload }) {
    try {
        const response = yield call(apiCancelOrder, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(CANCEL_ORDER_SUCCESS(response.data));
        } else {
            yield put(CANCEL_ORDER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* productSaga() {
    yield takeLatest(GET_ALL_ORDER().type, handleGetAllOrder);
    yield takeLatest(APPROVE_ORDER().type, handleApproveOrder);
    yield takeLatest(DELIVERING_ORDER().type, handleDeliveringOrder);
    yield takeLatest(CANCEL_ORDER().type, handleCancelOrder);
}
