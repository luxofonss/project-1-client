import { Button, Col, ConfigProvider, Layout, Menu, Modal, Row, Spin } from 'antd';
// import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { REQUEST_STATE, SIDER_COLLAPSE } from '~/app-configs';
import {
    IconDashboard,
    IconShopBasket,
    IconOrder,
    IconUser,
    IconTransaction,
    LogoAdmin,
    IconCategory,
    IconUpload,
} from '~/assets/svgs';
import AppButton from '~/components/AppButton/AppButton';
import AppHeader from '~/components/Layout/components/Header';
import ClientHeader from '~/containers/app/screens/Customer/components/ClientHeader';
import Footer from '../components/Footer';
import styles from './CustomerProfileLayout.sass';
import { storage } from '~/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { UPDATE_PROFILE } from '~/redux/actions/user';

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
    getMenu('Profile', '/profile', 'profile', <IconUser />),
    getMenu('Order', '/orders', 'order', <IconOrder />),
];

function CustomerProfileLayout({ children, match }) {
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [collapsed, setCollapsed] = useState(localStorage.getItem(SIDER_COLLAPSE) ?? false);
    const [selectedImage, setSelectedImage] = useState(null);
    const currentRouter = useSelector((state) => state.router.location);
    const updateProfile = useSelector((state) => state.user.updateProfile);
    const user = useSelector((state) => state.user?.profile);
    const [selectedSider, setSelectedSider] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    console.log('user', user);

    useEffect(() => {
        console.log('selectedSider: ', selectedSider);
    }, [selectedSider]);

    const handleMenuClick = (e) => {
        localStorage.setItem('menuId', e.target.id);
        history.push(e.target.key);
    };

    const currentPath = history.location.pathname;

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const onChangeAvatar = () => {
        const storageRef = ref(storage, `/images/${selectedImage + v4()}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);
        setUploadingImage(true);
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
                    setUploadingImage(false);
                    dispatch(UPDATE_PROFILE({ avatar: URL }));
                });
            },
        );
    };

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
                                        <div
                                            onClick={showModal}
                                            style={user?.avatar && { backgroundImage: `url("${user.avatar}")` }}
                                            className={cx('name-circle')}
                                        >
                                            {!user?.avatar && user?.lastName[0]}
                                        </div>

                                        <Modal
                                            title="Change avatar"
                                            open={isModalOpen}
                                            onOk={handleOk}
                                            footer={[]}
                                            onCancel={handleCancel}
                                        >
                                            <div className={cx('upload-wrapper')}>
                                                <div className={cx('upload')}>
                                                    <input
                                                        style={{ display: 'none' }}
                                                        id="image"
                                                        type="file"
                                                        onChange={(event) => {
                                                            handleChange(event);
                                                        }}
                                                    ></input>
                                                    {user?.avatar && !selectedImage && (
                                                        <div
                                                            className={cx('selected-image')}
                                                            style={{
                                                                backgroundImage: `url("${user.avatar}")`,
                                                                borderRadius: '24px',
                                                                width: '200px',
                                                                height: '200px',
                                                                backgroundSize: 'cover',
                                                                backgroundRepeat: 'no-repeat',
                                                                margin: '0 auto',
                                                            }}
                                                        ></div>
                                                    )}
                                                    {selectedImage && (
                                                        <div
                                                            className={cx('selected-image')}
                                                            style={{
                                                                backgroundImage: `url(${URL.createObjectURL(
                                                                    selectedImage,
                                                                )})`,
                                                                borderRadius: '24px',
                                                                width: '200px',
                                                                height: '200px',
                                                                backgroundSize: 'cover',
                                                                backgroundRepeat: 'no-repeat',
                                                                margin: '0 auto',
                                                            }}
                                                        ></div>
                                                    )}
                                                    {!selectedImage && !user?.avatar && (
                                                        <label className={cx('label')} htmlFor="image">
                                                            <span style={{ display: 'block' }}>Tải lên hình ảnh</span>
                                                            <IconUpload />
                                                        </label>
                                                    )}
                                                </div>
                                                {selectedImage && !user?.avatar && (
                                                    <label className={cx('label flex-center mt-2')} htmlFor="image">
                                                        <span style={{ display: 'block' }}>Tải lên hình ảnh</span>
                                                        <IconUpload />
                                                    </label>
                                                )}
                                                {user?.avatar && (
                                                    <label className={cx('label flex-center mt-2')} htmlFor="image">
                                                        <span style={{ display: 'block' }}>Tải lên hình ảnh</span>
                                                        <IconUpload />
                                                    </label>
                                                )}
                                            </div>
                                            <Row>
                                                {selectedImage && (
                                                    <div className="bottom-right">
                                                        <AppButton onClick={onChangeAvatar}>
                                                            {updateProfile === REQUEST_STATE.REQUEST ||
                                                            uploadingImage === true ? (
                                                                <Spin />
                                                            ) : (
                                                                'Confirm'
                                                            )}
                                                        </AppButton>
                                                    </div>
                                                )}
                                            </Row>
                                        </Modal>
                                        <div className={cx('name')}>{user?.lastName + ' ' + user?.firstName}</div>
                                    </div>
                                    <menu className={cx('menu')}>
                                        {menuItems.map((item) => (
                                            <div>
                                                <Link
                                                    onClick={(e) => {
                                                        handleMenuClick(e);
                                                    }}
                                                    id={item.key}
                                                    key={item.key}
                                                    to={item.path}
                                                    className={
                                                        currentPath === item.path
                                                            ? cx('menu-item-active')
                                                            : cx('menu-item')
                                                    }
                                                >
                                                    <div className={cx('text normal-link')}> {item.label}</div>
                                                    <div className={cx('icon')}>{item.icon}</div>
                                                </Link>
                                            </div>
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
            </ConfigProvider>
        </div>
    );
}

export default CustomerProfileLayout;
