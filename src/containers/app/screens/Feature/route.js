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
    {
        path: '/category',
        exact: true,
        isPrivate: true,
        role: 'user',
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([featureModule], 'app');
            return import('./pages/Category');
        }),
    },
    {
        path: '/category/edit',
        exact: true,
        isPrivate: true,
        role: 'user',
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([featureModule], 'app');
            return import('./pages/CategoryEdit');
        }),
    },
];
