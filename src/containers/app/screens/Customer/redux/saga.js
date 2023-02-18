import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiAddProductToCart, apiGetCart } from '~/app-data/cart';
import {
    ADD_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART_FAIL,
    ADD_PRODUCT_TO_CART_SUCCESS,
    GET_CART,
    GET_CART_FAIL,
    GET_CART_SUCCESS,
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
export default function* productSaga() {
    yield takeLatest(ADD_PRODUCT_TO_CART().type, handleAddProductToCart);
    yield takeLatest(GET_CART().type, handleGetCart);
}
