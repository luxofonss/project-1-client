import { lazy } from 'react';
import { ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const promoModule = {
    key: 'promo',
    path: 'Promo',
};

export default {
    path: '/admin/promo',
    exact: true,
    isPrivate: true,
    role: [ROLE.ADMIN],
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([promoModule], 'app');
        return import('./pages/PromoList');
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
