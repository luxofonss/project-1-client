import { lazy } from 'react';
import AuthLayout from '~/components/Layout/AuthLayout';
import { initModules } from '~/router/index';

export const loginModule = { key: 'signup', path: 'Signup' };

const container = 'authentication';

export default {
    path: '/auth',
    exact: true,
    isPrivate: false,
    role: null,
    layout: AuthLayout,
    component: lazy(async () => {
        return import('./Login');
    }),
};
