import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    GET_ALL_USERS,
    GET_ALL_USERS_FAIL,
    GET_ALL_USERS_RESET,
    GET_ALL_USERS_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: [],
};

export default combineReducers({
    allUser: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case GET_ALL_USERS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_ALL_USERS_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case GET_ALL_USERS_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case GET_ALL_USERS_RESET().type: {
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
    updateUser: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case UPDATE_USER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case UPDATE_USER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case UPDATE_USER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            case UPDATE_USER_RESET().type: {
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
