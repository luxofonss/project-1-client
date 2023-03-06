import accounting from 'accounting';
import { Col, notification, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import CartProduct from '../../../Customer/components/CartProduct';
import {
    APPROVE_ORDER,
    APPROVE_ORDER_RESET,
    CANCEL_ORDER,
    CANCEL_ORDER_RESET,
    DELIVERING_ORDER,
    DELIVERING_ORDER_RESET,
    GET_ALL_ORDER,
} from '../../redux/action';
import styles from './OrderDetail.module.sass';

const cx = classNames.bind(styles);

function OrderDetail({ order, ...props }) {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.order?.orderList);
    const approveOrder = useSelector((state) => state.order?.approveOrder);
    const deliveringOrder = useSelector((state) => state.order?.deliveringOrder);
    const cancelOrder = useSelector((state) => state.order?.cancelOrder);
    const { id } = useParams();

    useEffect(() => {
        if (approveOrder?.state === REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Approve order successfully!',
            });
            dispatch(APPROVE_ORDER_RESET());
        }
        if (approveOrder?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Fail',
                description: 'Something went wrong, please try again!',
            });
            dispatch(APPROVE_ORDER_RESET());
        }
        if (deliveringOrder?.state === REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Delivering order successfully!',
            });
            dispatch(DELIVERING_ORDER_RESET());
        }
        if (deliveringOrder?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Fail',
                description: 'Something went wrong, please try again!',
            });
            dispatch(DELIVERING_ORDER_RESET());
        }
        if (cancelOrder?.state === REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Cancel order successfully!',
            });
            dispatch(CANCEL_ORDER_RESET());
        }
        if (cancelOrder?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Fail',
                description: 'Something went wrong, please try again!',
            });
            dispatch(CANCEL_ORDER_RESET());
        }
        dispatch(GET_ALL_ORDER({ id: id }));
    }, [approveOrder?.state, deliveringOrder?.state, cancelOrder?.state]);

    useEffect(() => {
        dispatch(GET_ALL_ORDER({ id: id }));
    }, []);

    const handleApprove = () => {
        dispatch(APPROVE_ORDER({ id: id }));
    };
    const handleDelivering = () => {
        dispatch(DELIVERING_ORDER({ id: id }));
    };
    const handleCancel = () => {
        dispatch(CANCEL_ORDER({ id: id }));
    };

    if (orderList?.data?.data?.length > 0)
        return (
            <div className={cx('container')}>
                <AppForm onSubmit={() => {}}>
                    <Row gutter={32}>
                        <Col xs={6}>
                            <AppInput
                                disabled
                                label="Name"
                                name="name"
                                value={orderList?.data?.data[0]?.userFullName}
                            />
                        </Col>
                        <Col xs={12}>
                            <AppInput
                                disabled
                                label="Address"
                                name="address"
                                value={orderList?.data?.data[0]?.userAddress}
                            />
                        </Col>
                        <Col xs={6}>
                            <AppInput
                                disabled
                                label="Phone"
                                name="userPhone"
                                value={orderList?.data?.data[0]?.userPhone}
                            />
                        </Col>
                        <Col xs={6}>
                            <AppInput
                                disabled
                                label="Fee (VND)"
                                name="fee"
                                value={accounting.formatNumber(orderList?.data?.data[0]?.fee)}
                            />
                        </Col>
                        <Col xs={6}>
                            <AppInput
                                disabled
                                label="Total (VND)"
                                name="total"
                                value={accounting.formatNumber(orderList?.data?.data[0]?.totalPrice)}
                            />
                        </Col>
                        <Col xs={6}>
                            <AppInput
                                disabled
                                label="Payment"
                                name="payment"
                                value={orderList?.data?.data[0]?.payment}
                            />
                        </Col>
                        <Col xs={6}>
                            <AppInput disabled label="Status" name="status" value={orderList?.data?.data[0]?.status} />
                        </Col>
                    </Row>
                    <Row gutter={12} style={{ marginTop: '24px' }}>
                        {orderList.data.data[0].hasStocks ? (
                            orderList.data.data[0].hasStocks.length > 0 ? (
                                orderList.data.data[0].hasStocks?.map((stock, index) => {
                                    return (
                                        <Col key={index} xs={12}>
                                            <CartProduct detail={true} key={index} product={stock} inOrder={false} />
                                        </Col>
                                    );
                                })
                            ) : (
                                <Col xs={12}>
                                    <CartProduct
                                        detail={true}
                                        key="item"
                                        product={orderList.data.data[0].hasStocks}
                                        inOrder={false}
                                    />
                                </Col>
                            )
                        ) : (
                            <div></div>
                        )}
                    </Row>
                </AppForm>
                {orderList?.data?.data[0]?.status === 'PENDING' && (
                    <Row>
                        <Col xs={3}>
                            <AppButton onClick={handleApprove} color="green">
                                Approve
                            </AppButton>
                        </Col>
                        <Col xs={3}>
                            <AppButton onClick={handleCancel}>Cancel</AppButton>
                        </Col>
                    </Row>
                )}
                {orderList?.data?.data[0]?.status === 'APPROVED' && (
                    <Row>
                        <Col xs={3}>
                            <AppButton onClick={handleDelivering}>Delivering</AppButton>
                        </Col>
                        <Col xs={3}>
                            <AppButton onClick={handleCancel}>Cancel</AppButton>
                        </Col>
                    </Row>
                )}
            </div>
        );
    else {
        return <div> no order</div>;
    }
}

export default OrderDetail;
