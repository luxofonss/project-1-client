import { Layout } from 'antd';
// import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { SIDER_COLLAPSE } from '~/app-configs';
import AppHeader from '~/components/Layout/components/ClientHeader';
import styles from './ProductLayout.module.sass';

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

function ProductLayout({ children, match }) {
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
                <Layout>
                    {/* <div className={cx('sider')}>
                        <div className={cx('filter-wrapper')}>
                            <h4>Categories</h4>
                            <div>
                                <div>
                                    <input type="checkbox" name="category" /> 1
                                </div>
                                <div>
                                    <input type="checkbox" name="category" /> 2
                                </div>
                                <div>
                                    <input type="checkbox" name="category" /> 3
                                </div>
                                <div>
                                    <input type="checkbox" name="category" /> 4
                                </div>
                                <div>
                                    <input type="checkbox" name="category" /> 5
                                </div>
                            </div>
                        </div>
                        <div className={cx('filter-wrapper')}>
                            <h4>Gender</h4>
                            <div>
                                <div>
                                    <input type="radio" name="gender" /> Men
                                </div>
                                <div>
                                    <input type="radio" name="gender" /> Women
                                </div>
                                <div>
                                    <input type="radio" name="gender" /> All
                                </div>
                            </div>
                        </div>
                        <div className={cx('filter-wrapper')}>
                            <h4>Form</h4>
                            <div>
                                <div>
                                    <input type="checkbox" name="form" /> Low Top
                                </div>
                                <div>
                                    <input type="checkbox" name="form" /> High Top
                                </div>
                                <div>
                                    <input type="checkbox" name="form" /> Mid Top
                                </div>
                                <div>
                                    <input type="checkbox" name="form" /> Mule
                                </div>
                            </div>
                        </div>
                        <div className={cx('filter-wrapper')}>
                            <h4>Price</h4>
                            <div>
                                <div>
                                    <input type="checkbox" name="price" /> $20 - $50
                                </div>
                                <div>
                                    <input type="checkbox" name="price" /> $50 - $100
                                </div>
                                <div>
                                    <input type="checkbox" name="price" /> $100 - $300
                                </div>
                                <div>
                                    <input type="checkbox" name="price" /> Greater than $300
                                </div>
                            </div>
                        </div>
                        <div className={cx('filter-wrapper')}>
                            <h4>Size</h4>
                            <div>
                                <div>
                                    <input type="checkbox" name="size" /> Free
                                </div>
                                <div>
                                    <input type="checkbox" name="size" /> S
                                </div>
                                <div>
                                    <input type="checkbox" name="size" /> M
                                </div>
                                <div>
                                    <input type="checkbox" name="size" /> L
                                </div>
                            </div>
                        </div>
                    </div> */}
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
            </Layout>
        </div>
    );
}

export default ProductLayout;
