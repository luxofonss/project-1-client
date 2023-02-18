import { Layout } from 'antd';
// import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { SIDER_COLLAPSE } from '~/app-configs';
import AppHeader from '~/components/Layout/components/ClientHeader';
import styles from './CustomerLayout.sass';

const cx = classNames.bind(styles);

const { Sider, Content } = Layout;

export function getMenu(label, path, key, icon) {
    return {
        label,
        path,
        key,
        icon,
    };
}

const UserInfo = () => <Link to="/me/info">Chỉnh sửa thông tin cá nhân</Link>;
const ContractManager = () => (
    <Link className={cx('nav-text')} to="/">
        Quản lý hợp đồng
    </Link>
);
const RequestHistory = () => (
    <Link className={cx('nav-text')} to="/request-history">
        Lịch sử yêu cầu
    </Link>
);

function CustomerLayout({ children, match }) {
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

    const targetMenuId = localStorage.getItem('menuId') || 'dashboard';

    // useEffect(() => {
    //     const targetMenu = document.getElementById(targetMenuId);
    //     targetMenu.classList.add('active');
    // }, [targetMenuId]);

    return (
        <div className={cx('app-layout')}>
            <Layout>
                <AppHeader />
                <Content
                    style={{
                        margin: '0px 0px',
                        padding: '0 0px',
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

export default CustomerLayout;
