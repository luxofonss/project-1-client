export function GET_COLOR(payload) {
    return {
        type: 'GET_COLOR',
        payload,
    };
}

export function GET_COLOR_SUCCESS(payload) {
    return {
        type: 'GET_COLOR_SUCCESS',
        payload,
    };
}

export function GET_COLOR_FAIL(payload) {
    return {
        type: 'GET_COLOR_FAIL',
        payload,
    };
}
