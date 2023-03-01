import { REQUEST_STATE } from '~/app-configs';
import { POST } from '~/app-data/fetch';
import { GET } from '~/app-data/fetch';
import { PATCH } from '~/app-data/fetch';

export const apiCreateOrder = async (params) => {
    try {
        const response = await POST('/api/order/create', params, { isFullPath: false });
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

export const apiGetOrder = async (params) => {
    try {
        const response = await GET('/api/order/get', params, { isFullPath: false });
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

export const apiGetAllOrder = async (params) => {
    try {
        const response = await GET('/api/order/', params, { isFullPath: false });
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
