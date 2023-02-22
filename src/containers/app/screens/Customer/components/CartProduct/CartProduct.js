import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './CartProduct.module.sass';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import { ADD_PRODUCT_TO_CART } from '~/containers/app/screens/Customer/redux/action';
import useDebounceValue from '~/hooks/useDebounceValue';
import accounting from 'accounting';
import { IconTrash } from '~/assets/svgs';

const cx = classNames.bind(styles);

function CartProduct({ inOrder = false, onUpdateProduct, product, ...props }) {
    const [quantity, setQuantity] = useState(!inOrder ? product.cart_stock.quantity : null);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const quantityValue = useDebounceValue(quantity, 500);

    useEffect(() => {
        if (!inOrder)
            if (quantityValue !== product.cart_stock.quantity) {
                console.log('useEffect update running');
                onUpdateProduct(product.id, quantityValue);
            }
    }, [quantityValue]);

    return (
        <div className={cx('cart-product')}>
            <Row>
                <Col xs={!inOrder ? 8 : 4}>
                    <div
                        style={{
                            backgroundImage: `url("${product.Product?.Images[0]?.src}")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                        className={cx('image')}
                    ></div>
                </Col>
                <Col xs={16}>
                    <div className={cx('top')}>
                        <div className={(cx('name'), 'text_over_flow_1')}>{product.Product.name}</div>
                        {!inOrder && (
                            <div
                                className={cx('close')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setQuantity(0);
                                }}
                            >
                                <IconTrash width={16} height={16} stroke="white" />
                            </div>
                        )}
                    </div>
                    <div className={cx('color-price')}>
                        <div>{product.Color.color}</div>
                        <div className={cx('price')}>{accounting.formatNumber(product.Product.price)} VND</div>
                    </div>
                    <div className={cx('size')}>
                        <div>Size: </div>
                        <div>{product.Size.size}</div>
                    </div>
                    {inOrder && (
                        <div className={cx('quantity')}>
                            <div className={cx('text')}>Quantity: </div>
                            <div className={cx('quantity-action')}>
                                <div>{product.order_stocks.quantity}</div>
                            </div>
                        </div>
                    )}
                    {!inOrder && (
                        <div className={cx('quantity')}>
                            <div className={cx('text')}>Quantity: </div>
                            <div className={cx('quantity-action')}>
                                <div
                                    className={cx('action')}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (0 > quantity - 1 || quantity - 1 <= product.stock) {
                                            setQuantity((prev) => prev - 1);
                                            setError(false);
                                        } else {
                                            setError(true);
                                        }
                                    }}
                                >
                                    -
                                </div>
                                <div>{quantity}</div>
                                <div
                                    className={cx('action')}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (0 > quantity + 1 || quantity + 1 <= product.stock) {
                                            setQuantity((prev) => prev + 1);
                                            setError(false);
                                        } else {
                                            setError(true);
                                        }
                                    }}
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    )}

                    {error && !inOrder && <div>Only {product.stock} items remaining</div>}
                </Col>
            </Row>
        </div>
    );
}

export default CartProduct;
