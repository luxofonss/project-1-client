export function ADD_PRODUCT_TO_CART(payload) {
    return {
        type: 'ADD_PRODUCT_TO_CART',
        payload: payload,
    };
}

export function ADD_PRODUCT_TO_CART_SUCCESS(payload) {
    return {
        type: 'ADD_PRODUCT_TO_CART_SUCCESS',
        payload: payload,
    };
}

export function ADD_PRODUCT_TO_CART_FAIL(payload) {
    return {
        type: 'ADD_PRODUCT_TO_CART_FAIL',
        payload: payload,
    };
}

export function ADD_PRODUCT_TO_CART_RESET(payload) {
    return {
        type: 'ADD_PRODUCT_TO_CART_RESET',
        payload: payload,
    };
}

export function GET_CART(payload) {
    return {
        type: 'GET_CART',
        payload: payload,
    };
}

export function GET_CART_SUCCESS(payload) {
    return {
        type: 'GET_CART_SUCCESS',
        payload: payload,
    };
}

export function GET_CART_FAIL(payload) {
    return {
        type: 'GET_CART_FAIL',
        payload: payload,
    };
}

export function GET_CART_RESET(payload) {
    return {
        type: 'GET_CART_RESET',
        payload: payload,
    };
}
