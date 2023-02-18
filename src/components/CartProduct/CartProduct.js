import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './CartProduct.module.sass';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';

const cx = classNames.bind(styles);

function CartProduct({ product, ...props }) {
    return (
        <div className={cx('cart-product')}>
            <Row>
                <Col xs={10}>
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
                <Col xs={14}>
                    <div className={cx('top')}>
                        <div className={cx('name')}>{product.Product.name}</div>
                        <div>x</div>
                    </div>
                    <div className={cx('price')}>{product.Product.price} VND</div>
                    <div className={cx('quantity')}>
                        <div>Quantity</div>
                        <div className={'flex-between'}>
                            <div>-</div>
                            <div>{product.cart_stock.quantity}</div>
                            <div>+</div>
                        </div>
                    </div>
                    <div className={cx('color')}>
                        <div>Color</div>
                        <div>{product.Color.color}</div>
                    </div>
                    <div className={cx('size')}>
                        <div>Size</div>
                        <div>{product.Size.size}</div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default CartProduct;
