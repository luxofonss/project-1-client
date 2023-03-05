import { Dropdown } from 'antd';
import classNames from 'classnames/bind';
import { Fragment, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { TOKEN_KEY } from '~/app-configs';
import { IconCart, IconSearch } from '~/assets/svgs';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import Cart from '~/containers/app/screens/Customer/components/Cart';
import { GET_CART } from '../../redux/action';
import styles from './ClientHeader.module.sass';

const cx = classNames.bind(styles);

function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload(false);
}
export default function (props) {
    const userDetail = useSelector((state) => state?.user?.profile);
    const userCheck = useSelector((state) => state?.user);
    const [isBlur, setIsBlur] = useState(false);
    const dispatch = useDispatch();
    const blur = useRef();
    const submitButton = useRef();
    const history = useHistory();

    const onSearch = (data) => {
        console.log(data);
        const path = history.location.pathname;
        if (path === '/product') {
            let search = new URLSearchParams(history.location.search);
            console.log(search.get('name'));
            if (search.get('name') !== null) {
                let index = history.location.search.indexOf(search.get('name'));
                let newSearch = history.location.search.slice(0, index) + data.search;
                history.push(path + newSearch);
            } else {
                history.push(path + history.location.search + `&name=${data.search}`);
            }
        } else {
            history.push(`/product?name=${data.search}`);
        }
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

    const currentPath = history.location.pathname;

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
                    <Link to="/" className={currentPath === '/' ? cx('item-active') : cx('item')}>
                        Home
                    </Link>
                    <Link to="/product" className={currentPath === '/product' ? cx('item-active') : cx('item')}>
                        Products
                    </Link>
                    <Link to="/about" className={currentPath === '/about' ? cx('item-active') : cx('item')}>
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
                                <Dropdown
                                    // overlay={<Menu items={cartItems} onClick={onClickCart} />}
                                    overlay={
                                        <div className={cx('user')}>
                                            <Link to="/profile">My account</Link>

                                            <Link to="/orders">My orders</Link>

                                            {userDetail?.role === '1' ? <Link to="/admin/product">Admin</Link> : null}

                                            <div style={{ cursor: 'pointer' }} onClick={handleLogout} href="#">
                                                Logout
                                            </div>
                                        </div>
                                    }
                                    placement="bottom"
                                    trigger={['click']}
                                    onOpenChange={onOpenChange}
                                >
                                    <div className={cx('header-nav')}>
                                        <div
                                            className={cx('image')}
                                            style={
                                                userDetail?.avatar && {
                                                    objectFit: 'contain',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    backgroundImage: `url("${userDetail.avatar}")`,
                                                }
                                            }
                                        >
                                            {!userDetail?.avatar && (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        color: 'white',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {userDetail?.lastName?.at(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Dropdown>
                            </div>
                            <div className={cx('welcome')}>
                                <span className={cx('welcome-1')}>Welcome back,</span>
                                <span className={cx('welcome-2')}>
                                    {userDetail ? userDetail?.lastName + ' ' + userDetail?.firstName : ''}
                                </span>
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
