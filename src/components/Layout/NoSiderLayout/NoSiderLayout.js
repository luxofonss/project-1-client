import { Layout } from 'antd';
// import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE, TOKEN_KEY } from '~/app-configs';
import AppHeader from '~/containers/app/screens/Customer/components/ClientHeader';
import { CHECK_VALID_TOKEN, CHECK_VALID_TOKEN_FAIL, RESET_CHECK_VALID_TOKEN } from '~/redux/actions/user';
import Footer from '../components/Footer';
import styles from './NoSiderLayout.module.sass';

const cx = classNames.bind(styles);

const { Sider, Content } = Layout;

function NoSiderLayout({ children, match }) {
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
    return (
        <div className={cx('app-layout')}>
            <Layout>
                <AppHeader />
                <Layout>
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
            </Layout>
        </div>
    );
}

export default NoSiderLayout;
