import { lazy } from 'react';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const featureModule = {
    key: 'feature',
    path: 'Feature',
};

export default {
    path: '/',
    exact: true,
    isPrivate: true,
    role: 'user',
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([featureModule], 'app');
        return import('./pages/Demo');
    }),
};

export const childRoutes = [
    {
        path: '/request-history',
        exact: true,
        isPrivate: true,
        role: 'admin',
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([featureModule], 'app');
            return import('./pages/RequestHistory');
        }),
    },

    {
        path: '/contract-manager',
        exact: true,
        isPrivate: true,
        role: 'user',
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([featureModule], 'app');
            return import('./pages/ContractManager');
        }),
    },

    {
        path: '/payment',
        exact: true,
        isPrivate: true,
        role: 'user',
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([featureModule], 'app');
            return import('./pages/Payment');
        }),
    },

    {
        path: '/support-request',
        exact: true,
        isPrivate: true,
        role: 'user',
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([featureModule], 'app');
            return import('./pages/SupportRequest');
        }),
    },

    {
        path: '/product',
        exact: true,
        isPrivate: true,
        role: 'user',
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([featureModule], 'app');
            return import('./pages/Product');
        }),
    },

    {
        path: '/product/add',
        exact: true,
        isPrivate: true,
        role: 'user',
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([featureModule], 'app');
            return import('./pages/AddProduct');
        }),
    },

    {
        path: '/product/edit',
        exact: true,
        isPrivate: true,
        role: 'user',
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([featureModule], 'app');
            return import('./pages/ProductEdit');
        }),
    },
];
