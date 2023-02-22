import classNames from 'classnames/bind';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import {
    ADD_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART_RESET,
    GET_CART,
} from '~/containers/app/screens/Customer/redux/action';
import { getBase64 } from '~/helpers/media';
import AppButton from '../../../../../../components/AppButton/AppButton';
import CartProduct from '../CartProduct';
import ChoosePromo from '../../../../../../components/Modals/ChoosePromo';
import styles from './Cart.module.sass';
import { notification } from 'antd';
import { IconX } from '~/assets/svgs';
import accounting from 'accounting';

const cx = classNames.bind(styles);

function Cart({ onGetValue, ...props }) {
    const [promo, setPromo] = useState('');
    const cartInfo = useSelector((state) => state.customer.cart);
    const dispatch = useDispatch();
    const addProductToCategory = useSelector((state) => state.customer.addProductToCart);

    useEffect(() => {
        dispatch(GET_CART({ isActive: 1 }));
    }, []);

    const handleGetPromo = (data) => {
        setPromo(data);
    };

    const totalPrice = useMemo(() => {
        let total;
        total = cartInfo?.data?.data?.reduce(
            (accumulator, currentValue) => accumulator + currentValue.cart_stock.quantity * currentValue.Product.price,
            0,
        );
        return total;
    }, [cartInfo?.data?.data]);
    console.log('total', totalPrice);

    useEffect(() => {
        if (onGetValue) {
            let submitData = { promoId: null, stockInfo: [] };
            submitData.promoId = promo?.id;
            cartInfo?.data?.data?.forEach((stock) => {
                submitData.stockInfo.push({
                    id: stock.id,
                    quantity: stock.cart_stock.quantity,
                });
            });
            onGetValue(submitData);
        }
    }, [promo, cartInfo?.data?.data]);

    useEffect(() => {
        if (addProductToCategory.state == REQUEST_STATE.SUCCESS) {
            dispatch(ADD_PRODUCT_TO_CART_RESET());
        }
        if (addProductToCategory?.state === REQUEST_STATE.ERROR) {
            dispatch(ADD_PRODUCT_TO_CART_RESET());
        }
    }, [addProductToCategory?.state]);

    const onUpdateProduct = (stockId, quantity) => {
        dispatch(ADD_PRODUCT_TO_CART({ stockId, quantity }));
        dispatch(GET_CART({ isActive: 1 }));
    };

    return (
        <div className={cx('cart-tab')} {...props}>
            <div className={cx('header')}>
                <div className={cx('text')}>Added to your bag</div>
                {!props.purchase && (
                    <div className={cx('close')}>
                        <IconX width={16} height={16} />
                    </div>
                )}
            </div>
            <div className={cx('list')}>
                {cartInfo.state === REQUEST_STATE.SUCCESS && cartInfo?.data?.data !== [] ? (
                    cartInfo?.data?.data.map((product, index) => (
                        <CartProduct onUpdateProduct={onUpdateProduct} key={index} product={product} />
                    ))
                ) : (
                    <div>empty</div>
                )}
            </div>

            <div className={cx('footer')}>
                {props.purchase && (
                    <div className={cx('promo')}>
                        <ChoosePromo onSubmit={handleGetPromo} />
                        <div>{promo.code}</div>
                        <div>{promo.percent ? `${promo.percent}% discount` : ''}</div>
                        <div>{!promo.percent && promo.discount ? promo.discount : ''}</div>
                    </div>
                )}
                {props.purchase && (
                    <Fragment>
                        <div className="flex-between">
                            <div>Order Subtotal:</div>
                            <div>{accounting.formatNumber(totalPrice)} VND</div>
                        </div>
                        <div className="flex-between">
                            <div>Shipping & Handling:</div>
                            <div>50.000 VND</div>
                        </div>
                    </Fragment>
                )}
                {promo.percent && props.purchase && (
                    <div className={cx('promo')}>
                        <div>Discount: </div>
                        <div>
                            {accounting.formatNumber(
                                totalPrice * (promo.percent / 100) > promo.discount
                                    ? promo.discount
                                    : totalPrice * (promo.percent / 100),
                            )}
                            VND
                        </div>
                    </div>
                )}
                {!promo.percent && promo.discount && props.purchase && (
                    <div className={cx('promo')}>
                        <div>Discount:</div>
                        <div>accounting.formatNumber(promo.discount) VND</div>
                    </div>
                )}
                {!props.purchase && (
                    <div className={cx('total')}>
                        <div>Total</div>
                        <div>{accounting.formatNumber(totalPrice)} VND</div>
                    </div>
                )}
                {props.purchase && !promo.percent && promo.discount && (
                    <div className={cx('total')}>
                        <div>Total</div>
                        <div>{accounting.formatNumber(totalPrice - 50000 - promo.discount)} VND</div>
                    </div>
                )}
                {props.purchase && promo.percent && promo.discount && (
                    <div className={cx('total')}>
                        <div>Total</div>
                        <div>
                            {accounting.formatNumber(
                                totalPrice * (promo.percent / 100) > promo.discount
                                    ? totalPrice - 50000 - promo.discount
                                    : totalPrice - 50000 - totalPrice * (promo.percent / 100),
                            )}{' '}
                            VND
                        </div>
                    </div>
                )}
                {!props.purchase && (
                    <Link to="/purchase">
                        <div className={cx('button')}> Purchase</div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Cart;
