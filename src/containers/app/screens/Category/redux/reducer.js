import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_CREATE,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_UPDATE,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_DELETE,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_RESTORE,
    CATEGORY_RESTORE_SUCCESS,
    CATEGORY_RESTORE_FAIL,
} from './action';

const defaultState = {
    state: null,
    data: [],
};

export default combineReducers({
    categoryList: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case CATEGORY_LIST_REQUEST().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.REQUEST,
                };
            }
            case CATEGORY_LIST_SUCCESS().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case CATEGORY_LIST_FAIL().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }

            default:
                return state;
        }
    },
    categoryCreate: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case CATEGORY_CREATE().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CATEGORY_CREATE_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case CATEGORY_CREATE_FAIL().type: {
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
    categoryUpdate: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case CATEGORY_UPDATE().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.REQUEST,
                };
            }
            case CATEGORY_UPDATE_SUCCESS().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.SUCCESS,
                    // data: action.payload,
                };
            }
            case CATEGORY_UPDATE_FAIL().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            default:
                return state;
        }
    },
    categoryDelete: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case CATEGORY_DELETE().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.REQUEST,
                };
            }
            case CATEGORY_DELETE_SUCCESS().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.SUCCESS,
                    // data: action.payload,
                };
            }
            case CATEGORY_DELETE_FAIL().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            default:
                return state;
        }
    },
    categoryRestore: (state = { ...defaultState }, action) => {
        switch (action.type) {
            case CATEGORY_RESTORE().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.REQUEST,
                };
            }
            case CATEGORY_RESTORE_SUCCESS().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.SUCCESS,
                    // data: action.payload,
                };
            }
            case CATEGORY_RESTORE_FAIL().type: {
                return {
                    ...state,
                    requestState: REQUEST_STATE.ERROR,
                    errorMessageKey: action.payload,
                };
            }
            default:
                return state;
        }
    },
});
