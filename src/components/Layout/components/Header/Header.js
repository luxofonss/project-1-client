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
            {/* <div className={cx('dropdown')}>
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
            </div> */}
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
                        <span style={{ color: 'white', fontWeight: 700 }}>{userDetail?.name?.at(0).toUpperCase()}</span>
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
