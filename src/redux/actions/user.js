export function LOGIN(payload) {
    return {
        type: 'LOGIN',
        payload,
    };
}

export function LOGIN_SUCCESS(payload) {
    return {
        type: 'LOGIN_SUCCESS',
        payload,
    };
}

export function LOGIN_FAIL(payload) {
    return {
        type: 'LOGIN_FAIL',
        payload,
    };
}

export function LOGOUT(payload) {
    return {
        type: 'LOGOUT',
        payload,
    };
}

export function SIGNUP(payload) {
    return {
        type: 'SIGNUP',
        payload,
    };
}

export function SIGNUP_SUCCESS(payload) {
    return {
        type: 'SIGNUP_SUCCESS',
        payload,
    };
}

export function SIGNUP_FAIL(payload) {
    return {
        type: 'SIGNUP_FAIL',
        payload,
    };
}

export function UPDATE_PROFILE(payload) {
    return {
        type: 'UPDATE_PROFILE',
        payload: payload,
    };
}

export function UPDATE_PROFILE_SUCCESS(payload) {
    return {
        type: 'UPDATE_PROFILE_SUCCESS',
        payload: payload,
    };
}

export function UPDATE_PROFILE_FAIL(payload) {
    return {
        type: 'UPDATE_PROFILE_FAIL',
        payload: payload,
    };
}

export function UPDATE_PROFILE_RESET(payload) {
    return {
        type: 'UPDATE_PROFILE_RESET',
        payload: payload,
    };
}

export function UPDATE_DOCUMENT_STORE_ADDRESS(payload) {
    return {
        type: 'UPDATE_DOCUMENT_STORE_ADDRESS',
        payload,
    };
}
export function UPDATE_DOCUMENT_STORE_ADDRESS_SUCCESS(payload) {
    return {
        type: 'UPDATE_DOCUMENT_STORE_ADDRESS_SUCCESS',
        payload,
    };
}
export function UPDATE_DOCUMENT_STORE_ADDRESS_FAIL(payload) {
    return {
        type: 'UPDATE_DOCUMENT_STORE_ADDRESS_FAIL',
        payload,
    };
}
export function RESET_UPDATE_DOCUMENT_STORE_ADDRESS(payload) {
    return {
        type: 'RESET_UPDATE_DOCUMENT_STORE_ADDRESS',
        payload,
    };
}

export function CHECK_VALID_TOKEN(payload) {
    return {
        type: 'CHECK_VALID_TOKEN',
        payload,
    };
}
export function CHECK_VALID_TOKEN_SUCCESS(payload) {
    return {
        type: 'CHECK_VALID_TOKEN_SUCCESS',
        payload,
    };
}
export function CHECK_VALID_TOKEN_FAIL(payload) {
    return {
        type: 'CHECK_VALID_TOKEN_FAIL',
        payload,
    };
}
export function RESET_CHECK_VALID_TOKEN(payload) {
    return {
        type: 'RESET_CHECK_VALID_TOKEN',
        payload,
    };
}
