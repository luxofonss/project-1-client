import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    PRODUCT_ADD,
    PRODUCT_ADD_FAIL,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_EDIT,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_GET,
    PRODUCT_GET_FAIL,
    PRODUCT_GET_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: [],
};

export default combineReducers({
    createProduct: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case PRODUCT_ADD().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case PRODUCT_ADD_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    // products: action.payload,
                };
            }
            case PRODUCT_ADD_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            default:
                return state;
        }
    },
    listProduct: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case PRODUCT_GET().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case PRODUCT_GET_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case PRODUCT_GET_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            default:
                return state;
        }
    },
    update: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case PRODUCT_EDIT().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case PRODUCT_EDIT_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    // products: action.payload,
                };
            }
            case PRODUCT_EDIT_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            default:
                return state;
        }
    },
});
