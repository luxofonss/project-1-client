import React, { Fragment, useState } from 'react';
import styles from './Payment.module.sass';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { BackIcon } from '~/assets/svgs';
import { Row, Col, Modal } from 'antd';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton.js';
import * as Dialog from '@radix-ui/react-dialog';

const cx = classNames.bind(styles);

function Payment(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Fragment>
            <div className={cx('back-wrapper')}>
                <Link to="/contract-manager">
                    <BackIcon />
                </Link>
                <h3>Thanh toán</h3>
            </div>
            <div className={cx('payment')}>
                <Row gutter={64}>
                    <Col xs={13}>
                        <div className={cx('payment-info')}>
                            <div className={cx('info-item')}>
                                <h5 className={cx('text')}>Gói hợp đồng</h5>
                                <div className={cx('value')}>C.EXTRA</div>
                            </div>
                            <div className={cx('info-item')}>
                                <h5 className={cx('text')}>Hợp đồng</h5>
                                <div className={cx('value')}>11/11/2032</div>
                            </div>
                            <div className={cx('info-item')}>
                                <h5 className={cx('text')}>Số lượng chứng chỉ</h5>
                                <div className={cx('value')}>12.0000</div>
                            </div>
                            <div className={cx('info-item')}>
                                <h5 className={cx('text')}>Địa chỉ ví</h5>
                                <div className={cx('value')}>13n13590j1092309ja0</div>
                            </div>
                            <div className={cx('info-item')}>
                                <h5 className={cx('text')}>Hình thức thanh toán</h5>
                                <div className={cx('value')}>Ngân hàng</div>
                            </div>
                            <div className={cx('info-item')}>
                                <h5 className={cx('text')}>Tải file minh chứng thanh toán</h5>
                                <div className={cx('value')}></div>
                            </div>
                            <div className={cx('info-item')}>
                                <h5 className={cx('text')}>Ghi chú</h5>
                                <textarea
                                    style={{ width: '75%', marginBottom: '0 !important' }}
                                    type="text"
                                    className={cx('value')}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xs={11}>
                        <h4>Các địa chỉ thanh toán</h4>
                        <div
                            style={{
                                width: '200px',
                                height: '200px',
                                backgroundSize: 'cover',
                                margin: '0 auto',
                                backgroundImage:
                                    'url("https://scontent.fhan4-1.fna.fbcdn.net/v/t1.15752-9/315519379_1273428596770856_7512661812575001028_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=rW39_sXzzaYAX8XRiSq&_nc_ht=scontent.fhan4-1.fna&oh=03_AdSNbfUDTKZsuvi-ZbNLlfcVpJlmwl8h_1UhhO7KASCiOw&oe=63ABD99B")',
                            }}
                        ></div>
                        <div className={cx('payment-method')}>
                            <h5 className={cx('text')}>Số tài khoản</h5>
                            <div className={cx('value')}>0348 3154 1546 5415</div>
                        </div>
                        <div className={cx('payment-method')}>
                            <h5 className={cx('text')}>Chủ tài khoản</h5>
                            <div className={cx('value')}>Nguyễn Văn Quyền</div>
                        </div>
                        <div className={cx('payment-method')}>
                            <h5 className={cx('text')}>Chi nhánh</h5>
                            <div className={cx('value')}>FBI Bank New York</div>
                        </div>
                        <div className={cx('payment-method')}>
                            <h5 className={cx('text')}>Ghi chú</h5>
                            <div className={cx('value')}>Ghi chú nhé</div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24}>
                        {/* <div className={cx('submit-btn')}>
                            <PrimaryButton
                                onClick={(e) => {
                                    console.log('object');
                                    showModal();
                                }}
                            >
                                Submit
                            </PrimaryButton>
                        </div> */}
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <div className={cx('submit-btn')}>
                                    <PrimaryButton>Submit</PrimaryButton>
                                </div>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className={cx('DialogOverlay')} />
                                <Dialog.Content className={cx('DialogContent')}>
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
                                    <Dialog.Close asChild>
                                        <button className={cx('IconButton')} aria-label="Close">
                                            &#10006;
                                        </button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </Col>
                </Row>
            </div>
            {/* <Modal
                className={cx('modal-style')}
                title="Basic Modal"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            ></Modal> */}
        </Fragment>
    );
}

export default Payment;
