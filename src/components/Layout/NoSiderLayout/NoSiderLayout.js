import { Layout } from 'antd';
// import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import AppHeader from '~/containers/app/screens/Customer/components/ClientHeader';
import Footer from '../components/Footer';
import styles from './NoSiderLayout.module.sass';

const cx = classNames.bind(styles);

const { Sider, Content } = Layout;

function NoSiderLayout({ children, match }) {
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
