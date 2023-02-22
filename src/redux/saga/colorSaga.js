import { call, put, takeLatest } from '@redux-saga/core/effects';
import { TOKEN_KEY } from '~/app-configs';
import { REQUEST_STATE } from '~/app-configs';
import { apiGetColors } from '~/app-data/color';
import { GET_COLOR, GET_COLOR_FAIL, GET_COLOR_SUCCESS } from '../actions/color';

function* handleGetColors({ type, payload }) {
    try {
        const response = yield call(apiGetColors, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_COLOR_SUCCESS(response.data));
        } else {
            yield put(GET_COLOR_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* sizeSaga() {
    yield takeLatest(GET_COLOR().type, handleGetColors);
}
