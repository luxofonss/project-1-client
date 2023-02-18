import { REQUEST_STATE } from '~/app-configs';
import { GET_SIZE, GET_SIZE_FAIL, GET_SIZE_SUCCESS } from '~/redux/actions/size';

const defaultState = {
    state: null,
    data: null,
};

export default function sizeReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_SIZE().type: {
            return {
                ...state,
                state: REQUEST_STATE.REQUEST,
            };
        }
        case GET_SIZE_SUCCESS().type: {
            return {
                ...state,
                state: REQUEST_STATE.SUCCESS,
                data: action.payload,
            };
        }
        case GET_SIZE_FAIL().type: {
            return {
                ...state,
                state: REQUEST_STATE.ERROR,
            };
        }
        default:
            return state;
    }
}
