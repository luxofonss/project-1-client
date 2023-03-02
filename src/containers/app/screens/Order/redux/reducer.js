import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    APPROVE_ORDER,
    APPROVE_ORDER_FAIL,
    APPROVE_ORDER_RESET,
    APPROVE_ORDER_SUCCESS,
    CANCEL_ORDER,
    CANCEL_ORDER_FAIL,
    CANCEL_ORDER_RESET,
    CANCEL_ORDER_SUCCESS,
    DELIVERING_ORDER,
    DELIVERING_ORDER_FAIL,
    DELIVERING_ORDER_RESET,
    DELIVERING_ORDER_SUCCESS,
    GET_ALL_ORDER,
    GET_ALL_ORDER_FAIL,
    GET_ALL_ORDER_RESET,
    GET_ALL_ORDER_SUCCESS,
} from './action';

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
    approveOrder: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case APPROVE_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case APPROVE_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case APPROVE_ORDER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case APPROVE_ORDER_RESET().type: {
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
    deliveringOrder: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case DELIVERING_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case DELIVERING_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case DELIVERING_ORDER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case DELIVERING_ORDER_RESET().type: {
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
    cancelOrder: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case CANCEL_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CANCEL_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case CANCEL_ORDER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case CANCEL_ORDER_RESET().type: {
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
