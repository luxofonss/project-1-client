import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import { GET_CART } from '~/containers/app/screens/Customer/redux/action';
import { getBase64 } from '~/helpers/media';
import AppButton from '../AppButton/AppButton';
import CartProduct from '../CartProduct';
import styles from './Cart.module.sass';

const cx = classNames.bind(styles);

function Cart(props) {
    const cartInfo = useSelector((state) => state.customer.cart);
    const dispatch = useDispatch();
    console.log('cartInfo', cartInfo);

    useEffect(() => {
        dispatch(GET_CART());
    }, []);
    return (
        <div className={cx('cart-tab')} {...props}>
            <div className={cx('header')}>
                <div className={cx('text')}>Cart</div>
                <div>x</div>
            </div>
            <div className={cx('list')}>
                {cartInfo.state === REQUEST_STATE.SUCCESS &&
                    cartInfo?.data?.data.map((product, index) => <CartProduct key={index} product={product} />)}
            </div>

            <div className={cx('footer')}>
                <div className={cx('promo')}>
                    <div>promo</div>
                    <AppButton>choose</AppButton>
                    <AppButton>use</AppButton>
                </div>
                {props.purchase && (
                    <div>
                        <div>
                            <div>Total price</div>
                            <div>400.500</div>
                        </div>
                        <div>
                            <div>Ship fee</div>
                            <div>400.500</div>
                        </div>
                    </div>
                )}
                <div className={cx('total')}>
                    <div>Total</div>
                    <div>400.000 VND</div>
                </div>
                <Link to="/purchase">
                    <div className={cx('button')}> Purchase</div>
                </Link>
            </div>
        </div>
    );
}

export default Cart;
