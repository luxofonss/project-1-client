import { Collapse } from 'antd';
import classNames from 'classnames/bind';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import CartProduct from '../../components/CartProduct';
import OrderItem from '../../components/OrderItem';
import { GET_ORDER } from '../../redux/action';
import styles from './Orders.module.sass';

const cx = classNames.bind(styles);
const { Panel } = Collapse;

function Orders(props) {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.customer.order);

    console.log('orderList', orderList);
    useEffect(() => {
        dispatch(GET_ORDER());
    }, []);

    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div className={cx('items-wrapper')}>
            <div className={cx('header')}>
                <div>Total orders: </div>
                {/* <div>Sort by date: </div> */}
            </div>
            <div className="divider"></div>
            <div className={cx('item-list')}>
                <Collapse onChange={onChange}>
                    {orderList.state === REQUEST_STATE.SUCCESS &&
                        orderList?.data?.data?.map((order, index) => {
                            return (
                                <Panel header={<OrderItem order={order} index={index} />} key={index}>
                                    <div>userAddress : {order.userAddress}</div>
                                    <div>useFullName : {order.userFullName}</div>
                                    <div>totalPrice :{order.totalPrice}</div>
                                    <div>fee : {order.fee}</div>
                                    <div>payment : {order.payment}</div>
                                    {order.hasStocks?.map((stock, index) => {
                                        return <CartProduct key={index} product={stock} inOrder={true} />;
                                    })}
                                </Panel>
                            );
                        })}
                </Collapse>
            </div>
        </div>
    );
}

export default Orders;
