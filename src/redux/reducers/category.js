import { REQUEST_STATE } from '~/app-configs';
import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL } from '../actions/category';

const defaultCategoryGetAllState = {
    categories: [],
};

export function categoryGetALLReducer(state = defaultCategoryGetAllState, action) {
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
                categories: action.payload,
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
}
