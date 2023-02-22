import { REQUEST_STATE } from '~/app-configs';
import { POST } from '~/app-data/fetch';
import { GET } from '~/app-data/fetch';
import { PATCH } from '~/app-data/fetch';

export const apiCreatePromo = async (params) => {
    try {
        const response = await POST('/api/promo/create', params, { isFullPath: false });
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

export const apiGetAllPromo = async (params) => {
    try {
        const response = await GET('/api/promo/', params, { isFullPath: false });
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
