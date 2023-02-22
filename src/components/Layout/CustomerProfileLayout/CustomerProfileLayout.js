import { Col, Layout, Menu, Row } from 'antd';
// import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { SIDER_COLLAPSE } from '~/app-configs';
import {
    IconDashboard,
    IconShopBasket,
    IconOrder,
    IconUser,
    IconTransaction,
    LogoAdmin,
    IconCategory,
} from '~/assets/svgs';
import AppHeader from '~/components/Layout/components/Header';
import ClientHeader from '~/containers/app/screens/Customer/components/ClientHeader';
import Footer from '../components/Footer';
import styles from './CustomerProfileLayout.sass';

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
    getMenu('User', '/admin/payment', 'user', <IconUser />),
    getMenu('Order', '/orders', 'order', <IconOrder />),
];

const UserInfo = () => <Link to="/me/info">Chỉnh sửa thông tin cá nhân</Link>;
const ContractManager = () => (
    <Link className={cx('nav-text')} to="/">
        Quản lý hợp đồng
    </Link>
);

function CustomerProfileLayout({ children, match }) {
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    const [collapsed, setCollapsed] = useState(localStorage.getItem(SIDER_COLLAPSE) ?? false);
    const history = useHistory();
    const currentRouter = useSelector((state) => state.router.location);
    const [selectedSider, setSelectedSider] = useState(getSelectedNav());

    function toggleSider() {
        setCollapsed(!collapsed);
        localStorage.setItem(SIDER_COLLAPSE, !collapsed);
    }

    const onClickSliderMenu = (item) => {
        history.push(item.key);
    };

    function getSelectedNav() {
        if (currentRouter?.pathname.includes('/config/sign-ceft/')) {
            return '/config/select-ceft';
        }
        return currentRouter?.pathname;
    }

    useEffect(() => {
        console.log('selectedSider: ', selectedSider);
    }, [selectedSider]);

    const handleMenuClick = (e) => {
        localStorage.setItem('menuId', e.target.id);
        history.push(e.target.key);
    };

    // const targetMenuId = localStorage.getItem('menuId') || 'dashboard';

    // useEffect(() => {
    //     const targetMenu = document.getElementById(targetMenuId);
    //     targetMenu.classList.add('active');
    // }, [targetMenuId]);

    return (
        <div className={cx('app-layout')}>
            <Layout>
                <ClientHeader />
                <Content
                    style={{
                        margin: '24px 100px',
                        // padding: 24,
                        minHeight: 280,
                        position: 'relative',
                    }}
                >
                    <Row gutter={0}>
                        <Col xs={5}>
                            <div className={cx('slider')}>
                                <div className={cx('logo')}>
                                    <LogoAdmin />
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
                                            className={cx('menu-item')}
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
                        </Col>
                        <Col xs={1}></Col>
                        <Col xs={17}>{children}</Col>
                    </Row>
                </Content>
                <Footer />
            </Layout>
        </div>
    );
}

export default CustomerProfileLayout;
