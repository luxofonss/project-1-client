import { call, put, takeLatest } from '@redux-saga/core/effects';
import { TOKEN_KEY } from '~/app-configs';
import { REQUEST_STATE } from '~/app-configs';
import { apiLogin, apiSignUp, apiProfile } from '~/app-data/auth';
import { apiUpdateInstitution, apiUpdateProfile } from '~/app-data/users';
import {
    CHECK_VALID_TOKEN_FAIL,
    UPDATE_PROFILE,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
} from '~/redux/actions/user';
import { UPDATE_DOCUMENT_STORE_ADDRESS } from '~/redux/actions/user';
import { UPDATE_DOCUMENT_STORE_ADDRESS_FAIL } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN_SUCCESS } from '~/redux/actions/user';
import { UPDATE_DOCUMENT_STORE_ADDRESS_SUCCESS } from '~/redux/actions/user';
import { LOGIN_SUCCESS, LOGIN, LOGIN_FAIL, SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL } from '~/redux/actions/user';

function* handleLogin({ type, payload }) {
    try {
        const response = yield call(apiLogin, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            localStorage.setItem(TOKEN_KEY, response.data.accessToken);
            const profile = yield call(apiProfile);
            yield put(LOGIN_SUCCESS(profile?.data));
        } else {
            yield put(LOGIN_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleSignUp({ type, payload }) {
    try {
        const response = yield call(apiSignUp, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            // console.log()
            localStorage.setItem(TOKEN_KEY, response.data.accessToken);
            const profile = yield call(apiProfile);
            yield put(SIGNUP_SUCCESS(profile?.data));
        } else {
            yield put(SIGNUP_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* updateDocumentStoreAddress({ type, payload }) {
    const { documentStoreAddress } = payload;
    try {
        const response = yield call(apiUpdateInstitution, { documentStoreAddress });
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                UPDATE_DOCUMENT_STORE_ADDRESS_SUCCESS({
                    data: documentStoreAddress,
                }),
            );
        } else {
            yield put(UPDATE_DOCUMENT_STORE_ADDRESS_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* checkValidToken({ type, payload }) {
    try {
        const response = yield call(apiProfile);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                CHECK_VALID_TOKEN_SUCCESS({
                    data: response?.data,
                }),
            );
        } else {
            localStorage.removeItem(TOKEN_KEY);
            yield put(CHECK_VALID_TOKEN_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleUpdateProfile({ type, payload }) {
    try {
        const response = yield call(apiUpdateProfile, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(UPDATE_PROFILE_SUCCESS(response.data));
            const profile = yield call(apiProfile);
            yield put(LOGIN_SUCCESS(profile?.data));
        } else {
            yield put(UPDATE_PROFILE_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* userSaga() {
    yield takeLatest(LOGIN().type, handleLogin);
    yield takeLatest(SIGNUP().type, handleSignUp);
    yield takeLatest(UPDATE_DOCUMENT_STORE_ADDRESS().type, updateDocumentStoreAddress);
    yield takeLatest(CHECK_VALID_TOKEN().type, checkValidToken);
    yield takeLatest(UPDATE_PROFILE().type, handleUpdateProfile);
}
