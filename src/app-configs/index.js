export const Configs = {
    BASE_API: process.env.REACT_APP_BASE_API_URL,
    DOMAIN: '',

    CURRENT_PAGE: 1,
    FILE_MAXIMUM: 5, //MB
    PAGE_SIZE_20: 20,
    PAGE_SIZE_4: 4,
};

export const REQUEST_STATE = {
    ERROR: 'ERROR',
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
};

export const ROLE = {
    ADMIN: '1',
    USER: '0',
};

// key store in localStorage, Cookies, Session
export const I18LANGUAGE_KEY = 'i18nextLng';
export const TOKEN_KEY = 'authentication_COBGBRPIIP';
export const SIDER_COLLAPSE = 'siderCollapse';

export const ACTION_TYPE = {
    CREATE: 'CREATE',
    LIST: 'LIST',
    VIEW: 'VIEW',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    UNMOUNT: 'UNMOUNT',
};

export const VALID_IMAGE_TYPES = ['image/gif', 'image/jpeg', 'image/png'];
