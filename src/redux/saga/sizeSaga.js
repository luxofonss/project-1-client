import { call, put, takeLatest } from '@redux-saga/core/effects';
import { TOKEN_KEY } from '~/app-configs';
import { REQUEST_STATE } from '~/app-configs';
import { apiGetSizes } from '~/app-data/size';
import { GET_SIZE, GET_SIZE_FAIL, GET_SIZE_SUCCESS } from '../actions/size';

function* handleGetSizes({ type, payload }) {
    try {
        const response = yield call(apiGetSizes, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_SIZE_SUCCESS(response.data));
        } else {
            yield put(GET_SIZE_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* sizeSaga() {
    yield takeLatest(GET_SIZE().type, handleGetSizes);
}
