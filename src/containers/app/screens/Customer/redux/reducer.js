import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    ADD_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART_FAIL,
    ADD_PRODUCT_TO_CART_RESET,
    ADD_PRODUCT_TO_CART_SUCCESS,
    CREATE_ORDER,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_RESET,
    CREATE_ORDER_SUCCESS,
    GET_CART,
    GET_CART_FAIL,
    GET_CART_RESET,
    GET_CART_SUCCESS,
    GET_ORDER,
    GET_ORDER_FAIL,
    GET_ORDER_RESET,
    GET_ORDER_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: [],
};

export default combineReducers({
    addProductToCart: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case ADD_PRODUCT_TO_CART().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case ADD_PRODUCT_TO_CART_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case ADD_PRODUCT_TO_CART_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case ADD_PRODUCT_TO_CART_RESET().type: {
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
    cart: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case GET_CART().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_CART_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case GET_CART_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case GET_CART_RESET().type: {
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
    order: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case GET_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case GET_ORDER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case GET_ORDER_RESET().type: {
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
    createOrder: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case CREATE_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CREATE_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case CREATE_ORDER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case CREATE_ORDER_RESET().type: {
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
