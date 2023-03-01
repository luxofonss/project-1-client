import { Dropdown } from 'antd';
import classNames from 'classnames/bind';
import React, { Fragment, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TOKEN_KEY } from '~/app-configs';
import { IconCart, IconSearch } from '~/assets/svgs';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import Cart from '~/containers/app/screens/Customer/components/Cart';
import { PRODUCT_GET } from '~/containers/app/screens/Product/redux/action';
import { GET_CART } from '../../redux/action';
import styles from './ClientHeader.module.sass';

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
    const [isBlur, setIsBlur] = useState(false);
    const dispatch = useDispatch();
    const blur = useRef();
    const submitButton = useRef();
    const onSearch = (data) => {
        console.log(data);
        dispatch(PRODUCT_GET({ name: data.search }));
    };

    var B = document.body,
        H = document.documentElement,
        height;

    if (typeof document.height !== 'undefined') {
        height = document.height; // For webkit browsers
    } else {
        height = Math.max(B.scrollHeight, B.offsetHeight, H.clientHeight, H.scrollHeight, H.offsetHeight);
    }

    const onOpenChange = (open) => {
        if (open) {
            console.log('height: ' + height);
            blur.current.classList.add('blur-window');
            setIsBlur(true);
            dispatch(GET_CART({ isActive: 1 }));
        } else {
            setIsBlur(false);
            blur.current.classList.remove('blur-window');
        }
    };

    return (
        <Fragment>
            <div style={isBlur ? { height: `${height}px` } : { height: '0px' }} ref={blur}></div>
            <header className={cx('header')}>
                <Link to="/">
                    <div style={{ cursor: 'pointer' }} className={cx('logo')}>
                        <div className={cx('first')}>LUX</div>
                        <div className={cx('second')}>SHOP</div>
                    </div>
                </Link>
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
                            <div className={cx('avatar')}>
                                <Dropdown
                                    // overlay={<Menu items={cartItems} onClick={onClickCart} />}
                                    overlay={<Cart />}
                                    placement="bottom"
                                    trigger={['click']}
                                    onOpenChange={onOpenChange}
                                >
                                    <div className={cx('header-nav')}>
                                        <IconCart />
                                    </div>
                                </Dropdown>
                            </div>
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
                                <AppButton style={{ height: '32px', padding: '0', fontSize: '15px' }}>
                                    Sign in
                                </AppButton>
                            </Link>
                            <Link to="auth">
                                <AppButton style={{ height: '32px', padding: '0', fontSize: '15px' }}>
                                    Sign up
                                </AppButton>
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </Fragment>
    );
}
