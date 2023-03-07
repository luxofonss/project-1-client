import { Dropdown } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TOKEN_KEY } from '~/app-configs';
import styles from './Header.module.sass';

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

export default function (props) {
    const userDetail = useSelector((state) => state?.user?.profile);

    return (
        <header className={cx('header')}>
            <div className={cx('avatar')}>
                <Dropdown
                    // overlay={<Menu items={cartItems} onClick={onClickCart} />}
                    overlay={
                        <div className={cx('user')}>
                            <Link to="/profile">My account</Link>

                            <Link to="/orders">My orders</Link>

                            {userDetail?.role === '1' ? <Link to="/admin/dashboard">Admin</Link> : null}

                            <div style={{ cursor: 'pointer' }} onClick={handleLogout} href="#">
                                Logout
                            </div>
                        </div>
                    }
                    placement="bottom"
                    trigger={['click']}
                    // onOpenChange={onOpenChange}
                >
                    <div className={cx('header-nav')}>
                        <div
                            className={cx('image')}
                            style={
                                userDetail?.avatar && {
                                    height: '100%',
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
                                        height: '100%',
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
        </header>
    );
}
