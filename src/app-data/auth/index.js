import { TOKEN_KEY } from '~/app-configs';
import { REQUEST_STATE } from '~/app-configs';
import { POST } from '~/app-data/fetch';
import { GET } from '~/app-data/fetch';

export const apiLogin = async (params) => {
    try {
        const response = await POST('/api/users/login', params, { isFullPath: false });
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

export const apiSignUp = async (params) => {
    try {
        const response = await POST('/api/users/signup', params, { isFullPath: false });
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

export const apiProfile = async () => {
    try {
        const response = await GET(
            '/api/users/profile',
            {
                token: localStorage.getItem(TOKEN_KEY),
            },
            { isFullPath: false },
        );
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
