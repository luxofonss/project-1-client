import { lazy } from 'react';
import { ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const orderModule = {
    key: 'order',
    path: 'Order',
};

export default {
    path: '/admin/orders',
    exact: true,
    isPrivate: true,
    role: [ROLE.ADMIN],
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([orderModule], 'app');
        return import('./pages/OrderList');
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
    //         await initModules([orderModule, categoryModule], 'app');
    //         return import('./pages/Addpromo');
    //     }),
    // },
];
