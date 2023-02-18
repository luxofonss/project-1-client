import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiLoadCategories, apiCreateCategory } from '~/app-data/category';
import {
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE,
} from './action';

function* handleLoadCategories({ type, payload }) {
    try {
        const response = yield call(apiLoadCategories, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(CATEGORY_LIST_SUCCESS(response));
        } else {
            yield put(CATEGORY_LIST_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleCreateCategory({ type, payload }) {
    try {
        const response = yield call(apiCreateCategory, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(CATEGORY_CREATE_SUCCESS(response));
        } else {
            yield put(CATEGORY_CREATE_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* categorySaga() {
    yield takeLatest(CATEGORY_LIST_REQUEST().type, handleLoadCategories);
    yield takeLatest(CATEGORY_CREATE().type, handleCreateCategory);
}
