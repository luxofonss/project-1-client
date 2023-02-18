import { lazy } from 'react';
import CustomerLayout from '~/components/Layout/CustomerLayout';
import { initModules } from '~/router/index';
import { ROLE } from '~/app-configs';
import { categoryModule } from '../Category/route';
import { productModule } from '../Product/route';
import ProductLayout from '~/components/Layout/ProductLayout';
import NoSiderLayout from '~/components/Layout/NoSiderLayout';

export const customerModule = {
    key: 'customer',
    path: 'Customer',
};

export default {
    path: '/',
    exact: true,
    isPrivate: true,
    role: [ROLE.ADMIN, ROLE.USER],
    layout: CustomerLayout,
    component: lazy(async () => {
        await initModules([customerModule, categoryModule, productModule], 'app');
        return import('./pages/HomePage');
    }),
};

export const childRoutes = [
    {
        path: '/product',
        exact: true,
        isPrivate: true,
        role: [ROLE.ADMIN, ROLE.USER],
        layout: ProductLayout,
        component: lazy(async () => {
            await initModules([customerModule, categoryModule, productModule], 'app');
            return import('./pages/Product');
        }),
    },
    {
        path: '/purchase',
        exact: true,
        isPrivate: true,
        role: [ROLE.ADMIN, ROLE.USER],
        layout: NoSiderLayout,
        component: lazy(async () => {
            await initModules([customerModule, categoryModule, productModule], 'app');
            return import('./pages/Purchase');
        }),
    },
];
