import { lazy } from 'react';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';
import { ROLE } from '~/app-configs';
import { categoryModule } from '../Category/route';

export const productModule = {
    key: 'product',
    path: 'Product',
};

export default {
    // path: '/',
    // exact: true,
    // isPrivate: true,
    // role: [ROLE.ADMIN, ROLE.USER],
    // layout: AppLayout,
    // component: lazy(async () => {
    //     await initModules([productModule, categoryModule], 'app');
    //     return import('./pages/Demo');
    // }),

    path: '/admin/product',
    exact: true,
    isPrivate: true,
    role: [ROLE.ADMIN],
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([productModule, categoryModule], 'app');
        return import('./pages/Product');
    }),
};

export const childRoutes = [
    {
        path: '/admin/product/add',
        exact: true,
        isPrivate: true,
        role: [ROLE.ADMIN],
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([productModule, categoryModule], 'app');
            return import('./pages/AddProduct');
        }),
    },

    {
        path: '/admin/product/edit/:id',
        exact: true,
        isPrivate: true,
        role: [ROLE.ADMIN],
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([productModule, categoryModule], 'app');
            return import('./pages/ProductEdit');
        }),
    },
];
