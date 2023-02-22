import accounting from 'accounting';
import { Col, Row, Tag } from 'antd';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import styles from './OrderItem.module.sass';

const cx = classNames.bind(styles);

function OrderItem({ order, index, ...props }) {
    return (
        <div className={cx('wrapper')} {...props}>
            <div className={cx('header')}>
                <Row gutter={24} style={{ width: '100%' }}>
                    <Col xs={6}>
                        <div className={cx('images')}>
                            {order.hasStocks?.map((product, index) => {
                                console.log(product);
                                return (
                                    <img
                                        key={index}
                                        className={cx('image')}
                                        src={
                                            product.Product?.Images[0]?.src
                                                ? product.Product?.Images[0].src
                                                : 'https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU='
                                        }
                                        alt="img"
                                    />
                                );
                            })}
                        </div>
                    </Col>
                    <Col xs={5}>
                        <div className={cx('num-of-product')}>{order.hasStocks.length} in your order</div>
                    </Col>
                    <Col xs={4}>
                        <div className={cx('num-of-product')}>{order.userPhone}</div>
                    </Col>
                    <Col xs={6}>
                        <div className={cx('price')}>{accounting.formatNumber(order.totalPrice)} VND</div>
                    </Col>
                    <Col xs={3}>
                        <div className={cx('status')}>{order.status === 'PENDING' ? <Tag>Pending</Tag> : 'TEST'}</div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default OrderItem;
