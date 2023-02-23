import { Header } from 'antd/lib/layout/layout';
import React, { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNavItem } from '~/components/Layout/AppLayout/AppLayout';
import { LogoutOutlined } from '@ant-design/icons';
import hustLogo from '~/assets/images/header/hust-logo.jpeg';
import { REQUEST_STATE, TOKEN_KEY } from '~/app-configs';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ClientHeader.module.sass';
import { NoticeDot, NoticeIcon, Union, UserIcon, LogoutIcon, IconBell, IconCart, IconSearch } from '~/assets/svgs';
import { set } from 'react-hook-form';
import AppInput from '~/components/AppInput';
import AppForm from '~/components/AppForm';
import { Menu, Dropdown } from 'antd';
import CartProduct from '~/containers/app/screens/Customer/components/CartProduct';
import AppButton from '~/components/AppButton/AppButton';
import Cart from '~/containers/app/screens/Customer/components/Cart';
import { PRODUCT_GET } from '~/containers/app/screens/Product/redux/action';
import { isEmptyValue } from '~/helpers/check';

const cx = classNames.bind(styles);

function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload(false);
}

const ListItem = React.forwardRef(({ className, children, title, ...props }, forwardedRef) => (
    <li>
        <NavigationMenu.Link asChild>
            <a className={cx('ListItemLink', className)} {...props} ref={forwardedRef}>
                <div className="ListItemHeading">{title}</div>
                <p className="ListItemText">{children}</p>
            </a>
        </NavigationMenu.Link>
    </li>
));

const onClickCart = (item) => {};

export default function (props) {
    const userDetail = useSelector((state) => state?.user?.profile);
    const userCheck = useSelector((state) => state?.user);
    const cartItems = [getNavItem(null, 'Đăng xuất', '/auth/logout', <LogoutOutlined />, null)];
    const dispatch = useDispatch();
    const submitButton = useRef();
    const onSearch = (data) => {
        console.log(data);
        dispatch(PRODUCT_GET({ name: data.search }));
    };

    return (
        <header className={cx('header')}>
            <div className={cx('logo')}>
                <div className={cx('first')}>LUX</div>
                <div className={cx('second')}>SHOP</div>
            </div>
            <div className={cx('search-nav')}>
                <AppForm onSubmit={onSearch} style={{ height: '100%', width: '100%' }}>
                    <AppInput
                        wrapperStyle={{ height: '100%', width: '100%' }}
                        name="search"
                        placeholder="Search something..."
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--light-80)' }}
                    />
                    <button style={{ display: 'none' }} ref={submitButton} type="submit">
                        submit
                    </button>
                    <div
                        onClick={(e) => {
                            submitButton.current.click();
                        }}
                        className={cx('search-icon')}
                    >
                        <IconSearch stroke="black" />
                    </div>
                </AppForm>
            </div>

            <div className={cx('menu')}>
                <Link to="/" className={cx('item')}>
                    Home
                </Link>
                <Link to="/product" className={cx('item')}>
                    Products
                </Link>
                <Link to="/about" className={cx('item')}>
                    About us
                </Link>
            </div>

            <div className={cx('right-nav')}>
                {userCheck.profile !== null ? (
                    <Fragment>
                        <Dropdown
                            // overlay={<Menu items={cartItems} onClick={onClickCart} />}
                            overlay={<Cart />}
                            placement="bottom"
                            trigger={['click']}
                        >
                            <div className={cx('header-nav')}>
                                <IconCart />
                            </div>
                        </Dropdown>
                        <div className={cx('avatar')}>
                            <div className={cx('dropdown')}>
                                <div
                                    className={cx('image', ' d-flex justify-content-center align-items-center')}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        objectFit: 'cover',
                                        backgroundImage: `url('https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/315652721_809865970070640_8534308457976519135_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mylD2NLfKr8AX9-Q3lE&tn=FMdAK198RPW4kdFE&_nc_ht=scontent.fhan14-3.fna&oh=00_AfA5_iphLTLMqPTZJh3VGw6m0sANzq07FJ71oxzRdmRk4w&oe=639058FE')`,
                                    }}
                                >
                                    <span style={{ color: 'white', fontWeight: 700 }}>
                                        {userDetail?.name?.at(0).toUpperCase()}
                                    </span>
                                </div>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Action
                                        </a>
                                    </li>
                                    <li>
                                        <div className="dropdown-item" href="#">
                                            <Link to="/orders">My orders</Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            onClick={handleLogout}
                                            className="dropdown-item"
                                            href="#"
                                        >
                                            Logout
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('welcome')}>
                                <span className={cx('welcome-1')}>Welcome back,</span>
                                <span className={cx('welcome-2')}>{userDetail ? userDetail.name : ''}</span>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <div className={cx('auth')}>
                        <Link to="/auth">
                            <AppButton style={{ height: '32px', padding: '0', fontSize: '15px' }}>Sign in</AppButton>
                        </Link>
                        <Link to="auth">
                            <AppButton style={{ height: '32px', padding: '0', fontSize: '15px' }}>Sign up</AppButton>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
