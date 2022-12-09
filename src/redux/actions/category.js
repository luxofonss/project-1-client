export function CATEGORY_LIST_REQUEST(payload) {
    return {
        type: 'CATEGORY_LIST_REQUEST',
        payload: payload,
    };
}

export function CATEGORY_LIST_SUCCESS(payload) {
    return {
        type: 'CATEGORY_LIST_SUCCESS',
        payload: payload,
    };
}

export function CATEGORY_LIST_FAIL(payload) {
    return {
        type: 'CATEGORY_LIST_FAIL',
        payload: payload,
    };
}
