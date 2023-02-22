import { REQUEST_STATE } from '~/app-configs';
import { GET_COLOR, GET_COLOR_FAIL, GET_COLOR_SUCCESS } from '~/redux/actions/color';

const defaultState = {
    state: null,
    data: null,
};

export default function colorReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_COLOR().type: {
            return {
                ...state,
                state: REQUEST_STATE.REQUEST,
            };
        }
        case GET_COLOR_SUCCESS().type: {
            return {
                ...state,
                state: REQUEST_STATE.SUCCESS,
                data: action.payload,
            };
        }
        case GET_COLOR_FAIL().type: {
            return {
                ...state,
                state: REQUEST_STATE.ERROR,
            };
        }
        default:
            return state;
    }
}
