import { Collapse, Divider } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import OrderDetailItem from '../../../Order/components/OrderDetailItem';
import OrderItem from '../../components/OrderItem';
import { GET_ORDER } from '../../redux/action';
import styles from './Orders.module.sass';

const cx = classNames.bind(styles);
const { Panel } = Collapse;

function Orders(props) {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.customer.order);

    useEffect(() => {
        dispatch(GET_ORDER());
    }, []);

    const onChange = (key) => {
        // console.log(key);
    };
    return (
        <div className={cx('items-wrapper')}>
            <div className={cx('header')}>
                <h4>Your orders: </h4>
                {/* <div>Sort by date: </div> */}
            </div>
            <Divider />
            <div className={cx('item-list')}>
                <Collapse onChange={onChange}>
                    {orderList.state === REQUEST_STATE.SUCCESS && orderList?.data?.data?.length > 0
                        ? orderList?.data?.data?.map((order, index) => {
                              return (
                                  <Panel header={<OrderItem order={order} index={index} />} key={index}>
                                      <OrderDetailItem order={order} />
                                  </Panel>
                              );
                          })
                        : orderList?.data?.data?.length === 0 && <div>You haven't bought any product!</div>}
                </Collapse>
            </div>
        </div>
    );
}

export default Orders;
