import { Header } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getNavItem } from '~/components/Layout/AppLayout/AppLayout';
import { LogoutOutlined } from '@ant-design/icons';
import hustLogo from '~/assets/images/header/hust-logo.jpeg';
import { TOKEN_KEY } from '~/app-configs';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ClientHeader.module.sass';
import { NoticeDot, NoticeIcon, Union, UserIcon, LogoutIcon, IconBell, IconCart, IconSearch } from '~/assets/svgs';
import { set } from 'react-hook-form';
import AppInput from '~/components/AppInput';
import AppForm from '~/components/AppForm';
import { Menu, Dropdown } from 'antd';
import CartProduct from '~/components/CartProduct';
import AppButton from '~/components/AppButton/AppButton';
import Cart from '~/components/Cart';

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

// export const Cart = (props) => {
//     const test = useSelector((state) => {
//         console.log('state: ', state);
//         return 1;
//     });
//     return (
//         <div className={cx('cart-tab')} {...props}>
//             <div className={cx('header')}>
//                 <div className={cx('text')}>Cart</div>
//                 <div>x</div>
//             </div>
//             <div className={cx('list')}>
//                 <CartProduct />
//                 <CartProduct />
//                 <CartProduct />
//                 <CartProduct />
//                 <CartProduct />
//             </div>

//             <div className={cx('footer')}>
//                 <div className={cx('promo')}>
//                     <div>promo</div>
//                     <AppButton>choose</AppButton>
//                     <AppButton>use</AppButton>
//                 </div>
//                 {props.purchase && (
//                     <div>
//                         <div>
//                             <div>Total price</div>
//                             <div>400.500</div>
//                         </div>
//                         <div>
//                             <div>Ship fee</div>
//                             <div>400.500</div>
//                         </div>
//                     </div>
//                 )}
//                 <div className={cx('total')}>
//                     <div>Total</div>
//                     <div>400.000 VND</div>
//                 </div>
//                 <Link to="/purchase">
//                     <div className={cx('button')}> Purchase</div>
//                 </Link>
//             </div>
//         </div>
//     );
// };

const onClickCart = (item) => {};

export default function (props) {
    const userDetail = useSelector((state) => state?.user?.profile);
    const cartItems = [getNavItem(null, 'Đăng xuất', '/auth/logout', <LogoutOutlined />, null)];

    return (
        <header className={cx('header')}>
            <div className={cx('logo')}>Logo</div>
            <div className={cx('search-nav')}>
                <AppForm style={{ height: '100%', width: '100%' }}>
                    <AppInput
                        wrapperStyle={{ height: '100%', width: '100%' }}
                        name="search"
                        placeHolder="Search something..."
                        style={{ backgroundColor: 'var(--light-80)', color: 'var(--light-0)' }}
                    />
                </AppForm>
                <div className={cx('search-icon')}>
                    <IconSearch stroke="black" />
                </div>
            </div>

            <div className={cx('menu')}>
                <Link to="/" className={cx('item')}>
                    Home
                </Link>
                <Link to="/product" className={cx('item')}>
                    Products
                </Link>
                {/* <Link to="/product/men" className={cx('item')}>
                    Men
                </Link>
                <Link to="/product/women" className={cx('item')}>
                    Women
                </Link> */}
                <Link to="/product/sale" className={cx('item')}>
                    Sale off
                </Link>
                <Link to="/about" className={cx('item')}>
                    About us
                </Link>
            </div>

            <div className={cx('right-nav')}>
                <div className={cx('dropdown')}>
                    <div className={cx('notify')} data-bs-toggle="dropdown" aria-expanded="false">
                        <div className={cx('bell')}>
                            <IconBell />
                        </div>
                        <div className={cx('notify-counter')}>2</div>
                    </div>
                    <ul className="dropdown-menu">
                        <li>
                            <a className={cx('dropdown-item')} href="#">
                                Action
                            </a>
                        </li>
                        <li>
                            <a className={cx('dropdown-item')} href="#">
                                Another action
                            </a>
                        </li>
                        <li>
                            <a className={cx('dropdown-item')} href="#">
                                Something else here
                            </a>
                        </li>
                    </ul>
                </div>

                <Dropdown
                    // overlay={<Menu items={cartItems} onClick={onClickCart} />}
                    overlay={<Cart />}
                    placement="bottom"
                    trigger={['click']}
                    arrow={{ pointAtCenter: true }}
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
                                {userDetail?.name.at(0).toUpperCase()}
                            </span>
                        </div>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" href="#">
                                    Action
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Another action
                                </a>
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
            </div>
        </header>
    );
}
