import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TOKEN_KEY } from '~/app-configs';
import {
    IconCallus,
    IconChatUs,
    IconGift,
    IconShipping,
    FbIcon,
    TwitterIcon,
    Instagram2,
    MessageIcon,
    PhoneIcon,
    AppStore,
    GooglePlay,
    Paypal,
    Visa,
    MasterCard,
} from '~/assets/svgs';
import styles from './Footer.module.sass';

const cx = classNames.bind(styles);

export default function Footer(props) {
    const userDetail = useSelector((state) => state?.user?.profile);

    return (
        <div className={cx('container')}>
            <section className={cx('services')}>
                <Row>
                    <Col xs={6}>
                        <div className={cx('item-wrapper')}>
                            <IconShipping />
                            <div className={cx('text')}>
                                <div className={cx('big')}>Free Shipping</div>
                                <div className={cx('small')}>When you spend $50+</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className={cx('item-wrapper')}>
                            <IconCallus />
                            <div className={cx('text')}>
                                <div className={cx('big')}>Call Us Anytime</div>
                                <div className={cx('small')}>+34 555 5555</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className={cx('item-wrapper')}>
                            <IconChatUs />
                            <div className={cx('text')}>
                                <div className={cx('big')}>Chat with us</div>
                                <div className={cx('small')}>We offer 24-hour chat support</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className={cx('item-wrapper')}>
                            <IconGift />
                            <div className={cx('text')}>
                                <div className={cx('big')}>Gift Cards</div>
                                <div className={cx('small')}>For your loved one, in any amount</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
            <section className={cx('info')}>
                <Row gutter={24}>
                    <Col xs={6}>
                        <div>
                            <Link to="/">
                                <div style={{ cursor: 'pointer' }} className="logo">
                                    <div className="first">LUX</div>
                                    <div className="second">SHOP</div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className={cx('col-wrapper')}>
                            <div className={cx('header')}>Navigate</div>
                            <div className={cx('item')}>
                                <Link to="/product?gender=0">Men</Link>
                            </div>
                            <div className={cx('item')}>
                                <Link to="/product?gender=1">Women</Link>
                            </div>
                            <div className={cx('item')}>
                                <Link to="/product?promo=1">Sale</Link>
                            </div>
                            <div className={cx('item')}>
                                <Link to="/">Home</Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className={cx('col-wrapper')}>
                            <div className={cx('header')}>Information</div>
                            <div className={cx('item')}>About us</div>
                            <div className={cx('item')}>My orders</div>
                            <div className={cx('item')}>Privacy & Policy</div>
                            <div className={cx('item')}>Terms & Conditions</div>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className={cx('col-wrapper')}>
                            <div className={cx('header')}>Follow us</div>
                            <div className={cx('social-wrapper')}>
                                <div style={{ width: 32, height: 32 }} className={cx('social-item')}>
                                    <FbIcon />
                                </div>
                                <div style={{ width: 32, height: 32 }} className={cx('social-item')}>
                                    <TwitterIcon />
                                </div>
                            </div>
                            <div className={cx('header')}>Apps</div>
                            <div className={cx('apps')}>
                                <div className={cx('item')}>
                                    <AppStore />
                                </div>
                                <div className={cx('item')}>
                                    <GooglePlay />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </div>
    );
}
