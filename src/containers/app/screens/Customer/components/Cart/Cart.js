import accounting from 'accounting';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import AppButton from '~/components/AppButton/AppButton';
import {
    ADD_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART_RESET,
    GET_CART,
} from '~/containers/app/screens/Customer/redux/action';
import ChoosePromo from '../../../../../../components/Modals/ChoosePromo';
import CartProduct from '../CartProduct';
import styles from './Cart.module.sass';
import emptyCart from '~/assets/images/empty_cart.png';

const cx = classNames.bind(styles);

function Cart({ onClose, onGetValue, ...props }) {
    const [promo, setPromo] = useState({ discount: 0, percent: 0 });
    const cartInfo = useSelector((state) => state.customer.cart);
    const addProductToCategory = useSelector((state) => state.customer.addProductToCart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_CART({ isActive: 1 }));
    }, []);

    const handleGetPromo = (data) => {
        setPromo(data);
    };

    const totalPrice = useMemo(() => {
        let total;
        total = cartInfo?.data?.data?.reduce(
            (accumulator, currentValue) =>
                accumulator + currentValue.cart_stocks?.quantity * currentValue.Product.price,
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
                console.log('stock', stock);
                submitData.stockInfo.push({
                    id: stock.id,
                    quantity: stock.cart_stocks?.quantity,
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
            </div>
            <div className={cx('list')}>
                {cartInfo?.data?.data?.length > 0
                    ? cartInfo?.data?.data.map((product, index) => (
                          <CartProduct onUpdateProduct={onUpdateProduct} key={index} product={product} />
                      ))
                    : cartInfo?.data?.data?.length === 0 && (
                          <div style={{ height: '200px', backgroundImage: `url("${emptyCart}")` }}>
                              <img
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  src={emptyCart}
                                  alt="empty"
                              />
                          </div>
                      )}
            </div>

            {cartInfo?.data?.data?.length === 0 && (
                <div className={cx('footer')}>
                    <Link to="/product">
                        <AppButton onClick={onClose} style={{ width: '100%' }}>
                            Shop now!
                        </AppButton>
                    </Link>
                </div>
            )}

            {cartInfo?.data?.data?.length > 0 && (
                <div className={cx('footer')}>
                    {props.purchase && (
                        <div className={cx('promo')}>
                            <ChoosePromo onSubmit={handleGetPromo} />
                            <div>{promo?.code}</div>
                            <div>{promo?.percent ? `${promo?.percent}% discount` : ''}</div>
                            <div>{!promo?.percent && promo?.discount ? promo?.discount : ''}</div>
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
                    {promo?.percent && props.purchase && (
                        <div className={cx('promo')}>
                            <div>Discount: </div>
                            <div>
                                {accounting.formatNumber(
                                    totalPrice * (promo?.percent / 100) > promo?.discount
                                        ? promo?.discount
                                        : totalPrice * (promo?.percent / 100),
                                )}
                                VND
                            </div>
                        </div>
                    )}
                    {!promo?.percent && promo?.discount && props.purchase && (
                        <div className={cx('promo')}>
                            <div>Discount:</div>
                            <div>accounting.formatNumber(promo?.discount) VND</div>
                        </div>
                    )}
                    {!props.purchase && (
                        <div className={cx('total')}>
                            <div>Total</div>
                            <div>{accounting.formatNumber(totalPrice)} VND</div>
                        </div>
                    )}
                    {props.purchase && !promo?.percent && promo?.discount && (
                        <div className={cx('total')}>
                            <div>Total</div>
                            <div>{accounting.formatNumber(totalPrice - 50000 - promo?.discount)} VND</div>
                        </div>
                    )}
                    {props.purchase && promo?.percent && promo?.discount && (
                        <div className={cx('total')}>
                            <div>Total</div>
                            <div>
                                {accounting.formatNumber(
                                    totalPrice * (promo?.percent / 100) > promo?.discount
                                        ? totalPrice - 50000 - promo?.discount
                                        : totalPrice - 50000 - totalPrice * (promo?.percent / 100),
                                )}{' '}
                                VND
                            </div>
                        </div>
                    )}
                    {!props.purchase && (
                        <Link to="/purchase">
                            <AppButton style={{ width: '100%' }}>Purchase</AppButton>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cart;
