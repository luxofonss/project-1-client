import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Success.module.css';
import classNames from 'classnames/bind';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function Success(...params) {
    return (
        <Fragment>
            <div
                style={{
                    width: '128px',
                    height: '128px',
                    backgroundSize: 'cover',
                    backgroundImage:
                        'url("https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/316158278_515737017270412_8186092024205025268_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=4b4EbrcjFQIAX-yWigk&_nc_ht=scontent.fsgn2-1.fna&oh=03_AdQEmx7mGgXxxRvyev8czVduO9VxpCkmn8soeLEoDLQ6zw&oe=63AE7F3E")',
                }}
            ></div>
            <h3 className={cx('content-h3')}>Gửi yêu cầu thành công</h3>
            <h4 className={cx('content-h4')}>
                Chúng tôi sẽ liên hệ bạn khi <br /> có kết quả
            </h4>
            <PrimaryButton>
                <Link className="normal-link" to="/contract-manager">
                    Quản lý yêu cầu
                </Link>
            </PrimaryButton>
            <Link className={cx('back-home')} to="contract-manager">
                Về trang chủ
            </Link>
        </Fragment>
    );
}

export default Success;
