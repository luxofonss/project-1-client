import { ConfigProvider, Layout } from 'antd';
// import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { REQUEST_STATE, SIDER_COLLAPSE, TOKEN_KEY } from '~/app-configs';
import AppHeader from '~/containers/app/screens/Customer/components/ClientHeader';
import { CHECK_VALID_TOKEN, CHECK_VALID_TOKEN_FAIL, RESET_CHECK_VALID_TOKEN } from '~/redux/actions/user';
import Footer from '../components/Footer';
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
    const isAuthenticated = useSelector((state) => state.user?.verifyAuthState);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const accessToken = localStorage.getItem(TOKEN_KEY);
            if (accessToken) {
                if (isAuthenticated !== REQUEST_STATE.SUCCESS) {
                    dispatch(CHECK_VALID_TOKEN());
                }
            } else {
                dispatch(CHECK_VALID_TOKEN_FAIL());
            }
        })();
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated === REQUEST_STATE.ERROR) {
            dispatch(RESET_CHECK_VALID_TOKEN());
        }
    }, [isAuthenticated]);
    function getSelectedNav() {
        if (currentRouter?.pathname.includes('/config/sign-ceft/')) {
            return '/config/select-ceft';
        }
        return currentRouter?.pathname;
    }

    useEffect(() => {
        console.log('selectedSider: ', selectedSider);
    }, [selectedSider]);

    return (
        <div className={cx('app-layout')}>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgLayout: 'linear-gradient(113.49deg, #b75337 -30.3%, #2d3a82 58.12%)',
                    },
                }}
            >
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
                    <Footer />
                </Layout>
            </ConfigProvider>
        </div>
    );
}

export default CustomerLayout;
