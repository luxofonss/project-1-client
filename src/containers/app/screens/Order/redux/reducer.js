import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import { GET_ALL_ORDER, GET_ALL_ORDER_FAIL, GET_ALL_ORDER_RESET, GET_ALL_ORDER_SUCCESS } from './action';

const defaultState = {
    state: null,
    data: [],
};

export default combineReducers({
    orderList: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case GET_ALL_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_ALL_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case GET_ALL_ORDER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case GET_ALL_ORDER_RESET().type: {
                return {
                    ...state,
                    state: null,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
});
