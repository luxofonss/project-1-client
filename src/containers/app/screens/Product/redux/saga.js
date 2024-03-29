import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import {
    PRODUCT_ADD,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_GET_SUCCESS,
    PRODUCT_GET_FAIL,
    PRODUCT_GET,
    PRODUCT_EDIT,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_ENABLE,
    PRODUCT_ENABLE_SUCCESS,
    PRODUCT_ENABLE_FAIL,
    PRODUCT_DISABLE_SUCCESS,
    PRODUCT_DISABLE_FAIL,
    PRODUCT_DISABLE,
} from './action';
import { apiAddProducts, apiGetProduct, apiEditProduct, apiDisableProduct, apiEnableProduct } from '~/app-data/product';

function* handleAddProducts({ type, payload }) {
    try {
        const response = yield call(apiAddProducts, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(PRODUCT_ADD_SUCCESS(response));
        } else {
            yield put(PRODUCT_ADD_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleGetProduct({ type, payload }) {
    try {
        const response = yield call(apiGetProduct, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(PRODUCT_GET_SUCCESS(response));
        } else {
            yield put(PRODUCT_GET_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleEditProduct({ type, payload }) {
    try {
        const response = yield call(apiEditProduct, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(PRODUCT_EDIT_SUCCESS(response));
        } else {
            yield put(PRODUCT_EDIT_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleEnableProduct({ type, payload }) {
    try {
        const response = yield call(apiEnableProduct, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(PRODUCT_ENABLE_SUCCESS(response));
        } else {
            yield put(PRODUCT_ENABLE_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleDisableProduct({ type, payload }) {
    try {
        const response = yield call(apiDisableProduct, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(PRODUCT_DISABLE_SUCCESS(response));
        } else {
            yield put(PRODUCT_DISABLE_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* productSaga() {
    yield takeLatest(PRODUCT_ADD().type, handleAddProducts);
    yield takeLatest(PRODUCT_GET().type, handleGetProduct);
    yield takeLatest(PRODUCT_EDIT().type, handleEditProduct);
    yield takeLatest(PRODUCT_ENABLE().type, handleEnableProduct);
    yield takeLatest(PRODUCT_DISABLE().type, handleDisableProduct);
}
