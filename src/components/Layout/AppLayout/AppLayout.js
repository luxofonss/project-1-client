import { Layout } from 'antd';
// import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { SIDER_COLLAPSE } from '~/app-configs';
import {
    IconCategory,
    IconDashboard,
    IconOrder,
    IconShopBasket,
    IconTransaction,
    IconUser,
    LogoAdmin,
} from '~/assets/svgs';
import AppHeader from '~/components/Layout/components/Header';
import styles from './AppLayout.module.sass';

const cx = classNames.bind(styles);

const { Sider, Content } = Layout;

export function getNavItem(className, label, key, icon, children, type) {
    return {
        className,
        label,
        key,
        icon,
        children,
        type,
    };
}

export function getMenu(label, path, key, icon) {
    return {
        label,
        path,
        key,
        icon,
    };
}

const menuItems = [
    getMenu('Dashboard', '/admin/dashboard', 'dashboard', <IconDashboard />),
    getMenu('Product', '/admin/product', 'product', <IconShopBasket />),
    getMenu('Category', '/admin/category', 'category', <IconCategory />),
    getMenu('Promo', '/admin/promo', 'promo', <IconTransaction />),
    getMenu('User', '/admin/users', 'user', <IconUser />),
    getMenu('Order', '/admin/orders', 'order', <IconOrder />),
    // getMenu('Transaction', '/admin/support-request', 'transaction', <IconTransaction />),
];

function AppLayout({ children, match }) {
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    const [collapsed, setCollapsed] = useState(localStorage.getItem(SIDER_COLLAPSE) ?? false);
    const history = useHistory();
    const currentRouter = useSelector((state) => state.router.location);
    const [selectedSider, setSelectedSider] = useState(getSelectedNav());

    function getSelectedNav() {
        if (currentRouter?.pathname.includes('/config/sign-ceft/')) {
            return '/config/select-ceft';
        }
        return currentRouter?.pathname;
    }

    const handleMenuClick = (e) => {
        localStorage.setItem('menuId', e.target.id);
        history.push(e.target.key);
    };

    return (
        <div className={cx('app-layout')}>
            {/* <Sider width={300} className={cx('slider')} trigger={null} collapsible collapsed={collapsed}> */}
            <div className={cx('slider')}>
                <div className={cx('logo')}>
                    {/* <LogoAdmin /> */}
                    <Link to="/">
                        <div style={{ cursor: 'pointer' }} className="logo">
                            <div className="first">LUX</div>
                            <div className="second">SHOP</div>
                        </div>
                    </Link>
                </div>
                <menu className={cx('menu')}>
                    {menuItems.map((item) => (
                        // <div className={cx('menu-item')}>
                        <Link
                            onClick={(e) => {
                                handleMenuClick(e);
                            }}
                            id={item.key}
                            key={item.key}
                            to={item.path}
                            className={
                                currentRouter.pathname.includes(item.path) ? cx('menu-item-active') : cx('menu-item')
                            }
                        >
                            <div className={cx('text normal-link')}> {item.label}</div>
                            <div className={cx('icon')}>{item.icon}</div>
                        </Link>
                        // </div>
                    ))}
                </menu>
                <div className={cx('slider-footer')}>
                    <div className={cx('more')}>
                        <a href="#">I need help!</a>
                    </div>
                    <div className={cx('copy-right')}>Copyright of Luxofons</div>
                </div>
            </div>
            <Layout>
                <AppHeader />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        position: 'relative',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </div>
    );
}

export default AppLayout;
