import { REQUEST_STATE } from '~/app-configs';
import { POST } from '~/app-data/fetch';
import { GET } from '~/app-data/fetch';

export const apiLoadProducts = async (params) => {
    try {
        const response = await GET('/api/product', params, { isFullPath: false });
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

export const apiAddProducts = async (body) => {
    try {
        const response = await POST('/api/product/create-product', body, { isFullPath: false });
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
export const apiGetProductById = async (id) => {
    try {
        const response = await GET(`/api/product/get-product?id=${id}`);
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

export const apiEditProduct = async (body) => {
    try {
        const response = await POST('/api/product/edit', body, { isFullPath: false });
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
