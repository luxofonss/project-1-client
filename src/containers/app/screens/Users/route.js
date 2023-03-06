import { lazy } from 'react';
import { ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const usersModule = {
    key: 'users',
    path: 'Users',
};

export default {
    path: '/admin/users',
    exact: true,
    isPrivate: true,
    role: [ROLE.ADMIN],
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([usersModule], 'app');
        return import('./pages/UserList');
    }),
};

export const childRoutes = [
    // {
    //     path: '/admin/promo/add',
    //     exact: true,
    //     isPrivate: true,
    //     role: [ROLE.ADMIN],
    //     layout: AppLayout,
    //     component: lazy(async () => {
    //         await initModules([promoModule, categoryModule], 'app');
    //         return import('./pages/Addpromo');
    //     }),
    // },
];
