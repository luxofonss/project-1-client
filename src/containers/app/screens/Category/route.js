import { lazy } from 'react';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';
import { ROLE } from '~/app-configs';
import { productModule } from '../Product/route';

export const categoryModule = {
    key: 'category',
    path: 'Category',
};

export default {
    path: '/admin/category',
    exact: true,
    isPrivate: true,
    role: [ROLE.ADMIN],
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([categoryModule, productModule], 'app');
        return import('./pages/Category');
    }),
};

export const childRoutes = [
    {
        path: '/admin/category/edit/:id',
        exact: true,
        isPrivate: true,
        role: [ROLE.ADMIN],
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([categoryModule, productModule], 'app');
            return import('./pages/CategoryEdit');
        }),
    },
];
