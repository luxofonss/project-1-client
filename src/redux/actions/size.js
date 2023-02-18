export function GET_SIZE(payload) {
    return {
        type: 'GET_SIZE',
        payload,
    };
}

export function GET_SIZE_SUCCESS(payload) {
    return {
        type: 'GET_SIZE_SUCCESS',
        payload,
    };
}

export function GET_SIZE_FAIL(payload) {
    return {
        type: 'GET_SIZE_FAIL',
        payload,
    };
}
