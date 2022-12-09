import { REQUEST_STATE } from '~/app-configs';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_ADD,
    PRODUCT_ADD_FAIL,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_GET_BY_ID,
    PRODUCT_GET_BY_ID_SUCCESS,
    PRODUCT_GET_BY_ID_FAIL,
    PRODUCT_DISABLE,
    PRODUCT_DISABLE_SUCCESS,
    PRODUCT_DISABLE_FAIL,
    PRODUCT_ENABLE,
    PRODUCT_ENABLE_SUCCESS,
    PRODUCT_ENABLE_FAIL,
} from '../actions/product';

const defaultProductGetAllState = {
    products: [],
};

const defaultProductAddState = {
    product: {},
};

const defaultProductGetByIdState = {
    product: {},
};

export function productGetALLReducer(state = defaultProductGetAllState, action) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.REQUEST,
            };
        }
        case PRODUCT_LIST_SUCCESS().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.SUCCESS,
                products: action.payload,
            };
        }
        case PRODUCT_LIST_FAIL().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.ERROR,
                errorMessageKey: action.payload,
            };
        }

        default:
            return state;
    }
}

export function productAddReducer(state = defaultProductAddState, action) {
    switch (action.type) {
        case PRODUCT_ADD().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.REQUEST,
            };
        }
        case PRODUCT_ADD_SUCCESS().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.SUCCESS,
                // products: action.payload,
            };
        }
        case PRODUCT_ADD_FAIL().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.ERROR,
                errorMessageKey: action.payload,
            };
        }
        default:
            return state;
    }
}

export function productGetByIdReducer(state = defaultProductGetByIdState, action) {
    switch (action.type) {
        case PRODUCT_GET_BY_ID().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.REQUEST,
            };
        }
        case PRODUCT_GET_BY_ID_SUCCESS().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.SUCCESS,
                products: action.payload,
            };
        }
        case PRODUCT_GET_BY_ID_FAIL().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.ERROR,
                errorMessageKey: action.payload,
            };
        }
        default:
            return state;
    }
}

export function productEditReducer(state = {}, action) {
    switch (action.type) {
        case PRODUCT_EDIT().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.REQUEST,
            };
        }
        case PRODUCT_EDIT_SUCCESS().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.SUCCESS,
                // products: action.payload,
            };
        }
        case PRODUCT_EDIT_FAIL().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.ERROR,
                errorMessageKey: action.payload,
            };
        }
        default:
            return state;
    }
}

export function productDisable(state = {}, action) {
    switch (action.type) {
        case PRODUCT_DISABLE().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.REQUEST,
            };
        }
        case PRODUCT_DISABLE_SUCCESS().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.SUCCESS,
                // products: action.payload,
            };
        }
        case PRODUCT_DISABLE_FAIL().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.ERROR,
                errorMessageKey: action.payload,
            };
        }
        default:
            return state;
    }
}
export function productEnable(state = {}, action) {
    switch (action.type) {
        case PRODUCT_ENABLE().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.REQUEST,
            };
        }
        case PRODUCT_ENABLE_SUCCESS().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.SUCCESS,
                // products: action.payload,
            };
        }
        case PRODUCT_ENABLE_FAIL().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.ERROR,
                errorMessageKey: action.payload,
            };
        }
        default:
            return state;
    }
}
