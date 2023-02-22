import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { TOKEN_KEY } from '~/app-configs';
import { IconCallus, IconChatUs, IconGift, IconShipping } from '~/assets/svgs';
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
        </div>
    );
}
