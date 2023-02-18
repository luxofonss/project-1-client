import { REQUEST_STATE } from '~/app-configs';
import { GET, POST } from '../fetch';

export const apiAddProductToCart = async (params) => {
    try {
        const response = await POST('/api/cart/add', params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log('error', error);
        return {
            error: error,
            state: REQUEST_STATE.ERROR,
            data: {},
        };
    }
};

export const apiGetCart = async (params) => {
    try {
        const response = await GET('/api/cart', params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log('error', error);
        return {
            error: error,
            state: REQUEST_STATE.ERROR,
            data: {},
        };
    }
};
