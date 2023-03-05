import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
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
                <div className={cx('dropdown')}>
                    <div
                        className={cx('image', ' d-flex justify-content-center align-items-center')}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
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
                            <span style={{ color: 'white', fontWeight: 700 }}>
                                {userDetail?.lastName?.at(0).toUpperCase()}
                            </span>
                        )}
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
        </header>
    );
}
