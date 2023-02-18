import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    ADD_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART_FAIL,
    ADD_PRODUCT_TO_CART_RESET,
    ADD_PRODUCT_TO_CART_SUCCESS,
    GET_CART,
    GET_CART_FAIL,
    GET_CART_RESET,
    GET_CART_SUCCESS,
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
});
