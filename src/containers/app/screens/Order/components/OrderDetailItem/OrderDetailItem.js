import accounting from 'accounting';
import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import CartProduct from '../../../Customer/components/CartProduct';
import styles from './OrderDetailItem.module.sass';

const cx = classNames.bind(styles);

function OrderDetailItem({ order, ...props }) {
    return (
        <div className={cx('container')}>
            <AppForm onSubmit={() => {}}>
                <Row gutter={32}>
                    <Col xs={6}>
                        <AppInput disabled label="Name" name="name" value={order?.userFullName} />
                    </Col>
                    <Col xs={12}>
                        <AppInput disabled label="Address" name="address" value={order?.userAddress} />
                    </Col>
                    <Col xs={6}>
                        <AppInput disabled label="Phone" name="userPhone" value={order?.userPhone} />
                    </Col>
                    <Col xs={6}>
                        <AppInput disabled label="Fee (VND)" name="fee" value={accounting.formatNumber(order?.fee)} />
                    </Col>
                    <Col xs={6}>
                        <AppInput
                            disabled
                            label="Total (VND)"
                            name="total"
                            value={accounting.formatNumber(order?.totalPrice)}
                        />
                    </Col>
                    <Col xs={6}>
                        <AppInput disabled label="Payment" name="payment" value={order?.payment} />
                    </Col>
                    <Col xs={6}>
                        <AppInput disabled label="Status" name="status" value={order?.status} />
                    </Col>
                </Row>
                <Row gutter={12} style={{ marginTop: '24px' }}>
                    {order.hasStocks ? (
                        order.hasStocks.length > 0 ? (
                            order.hasStocks?.map((stock, index) => {
                                return (
                                    <Col key={index} xs={12}>
                                        <CartProduct detail={true} key={index} product={stock} inOrder={false} />
                                    </Col>
                                );
                            })
                        ) : (
                            <Col xs={12}>
                                <CartProduct detail={true} key="item" product={order.hasStocks} inOrder={false} />
                            </Col>
                        )
                    ) : (
                        <div></div>
                    )}
                </Row>
            </AppForm>
        </div>
    );
}

export default OrderDetailItem;
