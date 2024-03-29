import { REQUEST_STATE } from '~/app-configs';
import { PATCH, POST } from '~/app-data/fetch';
import { GET } from '~/app-data/fetch';

export const apiCreateCategory = async (params) => {
    try {
        const response = await POST(`/api/category/create`, params, { isFullPath: false });
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

export const apiLoadCategories = async (params) => {
    try {
        const response = await GET(`/api/category`, params, { isFullPath: false });
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

export const apiUpdateCategory = async (params) => {
    try {
        const response = await PATCH(`/api/category/update`, params, { isFullPath: false });
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
