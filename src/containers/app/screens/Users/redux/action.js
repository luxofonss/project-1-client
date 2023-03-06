export function GET_ALL_USERS(payload) {
    return {
        type: 'GET_ALL_USERS',
        payload: payload,
    };
}

export function GET_ALL_USERS_SUCCESS(payload) {
    return {
        type: 'GET_ALL_USERS_SUCCESS',
        payload: payload,
    };
}

export function GET_ALL_USERS_FAIL(payload) {
    return {
        type: 'GET_ALL_USERS_FAIL',
        payload: payload,
    };
}

export function GET_ALL_USERS_RESET(payload) {
    return {
        type: 'GET_ALL_USERS_RESET',
        payload: payload,
    };
}

export function UPDATE_USER(payload) {
    return {
        type: 'UPDATE_USER',
        payload: payload,
    };
}

export function UPDATE_USER_SUCCESS(payload) {
    return {
        type: 'UPDATE_USER_SUCCESS',
        payload: payload,
    };
}

export function UPDATE_USER_FAIL(payload) {
    return {
        type: 'UPDATE_USER_FAIL',
        payload: payload,
    };
}

export function UPDATE_USER_RESET(payload) {
    return {
        type: 'UPDATE_USER_RESET',
        payload: payload,
    };
}
