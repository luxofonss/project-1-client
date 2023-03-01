export function GET_ALL_ORDER(payload) {
    return {
        type: 'GET_ALL_ORDER',
        payload: payload,
    };
}

export function GET_ALL_ORDER_SUCCESS(payload) {
    return {
        type: 'GET_ALL_ORDER_SUCCESS',
        payload: payload,
    };
}

export function GET_ALL_ORDER_FAIL(payload) {
    return {
        type: 'GET_ALL_ORDER_FAIL',
        payload: payload,
    };
}

export function GET_ALL_ORDER_RESET(payload) {
    return {
        type: 'GET_ALL_ORDER_RESET',
        payload: payload,
    };
}
