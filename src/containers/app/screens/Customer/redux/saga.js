import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiAddProductToCart, apiGetCart } from '~/app-data/cart';
import { apiCreateOrder, apiGetOrder } from '~/app-data/order';
import {
    ADD_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART_FAIL,
    ADD_PRODUCT_TO_CART_SUCCESS,
    CREATE_ORDER,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    GET_CART,
    GET_CART_FAIL,
    GET_CART_SUCCESS,
    GET_ORDER,
    GET_ORDER_FAIL,
    GET_ORDER_SUCCESS,
} from './action';

function* handleAddProductToCart({ type, payload }) {
    try {
        const response = yield call(apiAddProductToCart, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ADD_PRODUCT_TO_CART_SUCCESS(response.data));
        } else {
            yield put(ADD_PRODUCT_TO_CART_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}
function* handleGetCart({ type, payload }) {
    try {
        const response = yield call(apiGetCart, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_CART_SUCCESS(response.data));
        } else {
            yield put(GET_CART_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleGetOrder({ type, payload }) {
    try {
        const response = yield call(apiGetOrder, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_ORDER_SUCCESS(response.data));
        } else {
            yield put(GET_ORDER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleCreateOrder({ type, payload }) {
    try {
        const response = yield call(apiCreateOrder, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(CREATE_ORDER_SUCCESS(response.data));
        } else {
            yield put(CREATE_ORDER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* productSaga() {
    yield takeLatest(ADD_PRODUCT_TO_CART().type, handleAddProductToCart);
    yield takeLatest(GET_CART().type, handleGetCart);
    yield takeLatest(CREATE_ORDER().type, handleCreateOrder);
    yield takeLatest(GET_ORDER().type, handleGetOrder);
}
