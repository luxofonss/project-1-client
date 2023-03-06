import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    CREATE_PROMO,
    CREATE_PROMO_FAIL,
    CREATE_PROMO_RESET,
    CREATE_PROMO_SUCCESS,
    DISABLE_PROMO,
    DISABLE_PROMO_FAIL,
    DISABLE_PROMO_RESET,
    DISABLE_PROMO_SUCCESS,
    ENABLE_PROMO,
    ENABLE_PROMO_FAIL,
    ENABLE_PROMO_RESET,
    ENABLE_PROMO_SUCCESS,
    GET_ALL_PROMO,
    GET_ALL_PROMO_FAIL,
    GET_ALL_PROMO_RESET,
    GET_ALL_PROMO_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: [],
};

export default combineReducers({
    createPromo: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case CREATE_PROMO().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CREATE_PROMO_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case CREATE_PROMO_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case CREATE_PROMO_RESET().type: {
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
    promoList: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case GET_ALL_PROMO().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_ALL_PROMO_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case GET_ALL_PROMO_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case GET_ALL_PROMO_RESET().type: {
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
    enablePromo: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case ENABLE_PROMO().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case ENABLE_PROMO_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case ENABLE_PROMO_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case ENABLE_PROMO_RESET().type: {
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
    disablePromo: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case DISABLE_PROMO().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case DISABLE_PROMO_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case DISABLE_PROMO_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case DISABLE_PROMO_RESET().type: {
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
