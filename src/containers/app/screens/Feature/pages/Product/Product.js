import React, { Fragment, useState, useEffect } from 'react';
import styles from './Product.module.sass';
import classNames from 'classnames/bind';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IconEdit } from '~/assets/svgs';
import { PRODUCT_GET_BY_ID, PRODUCT_LIST_REQUEST } from '~/redux/actions/product';
import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Product(props) {
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const productList = product.products.data;
    useEffect(() => {
        dispatch(PRODUCT_LIST_REQUEST());
        console.log('dispatch');
    }, []);
    console.log('prd', product.products.data);

    const handleEdit = (id) => {
        localStorage.setItem('selectedId', id);
    };
    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Form className={styles.search}>
                        <Form.Control type="search" placeholder="Search" className="search me-2" aria-label="Search" />
                        <PrimaryButton variant="outline-success">Search</PrimaryButton>
                    </Form>
                    <Form.Select className={styles.select} aria-label="Default select example">
                        <option value="1">All category</option>
                        <option value="2">T-Shirt</option>
                        <option value="3">Pants</option>
                    </Form.Select>
                    <Form.Select className={styles.select} aria-label="Default select example">
                        <option value="0">Last added</option>
                        <option value="1">Cheap first</option>
                        <option value="2">Most viewed</option>
                    </Form.Select>

                    <Link to="/product/add" className="normal-link-white">
                        <PrimaryButton>Add</PrimaryButton>
                    </Link>
                </div>
                <Container className={cx('product-list')}>
                    <Row>
                        {productList &&
                            productList.map((product) => (
                                <Col className={cx('item-wrapper')} xs={3}>
                                    <div className={cx('item-container')}>
                                        <div
                                            className={cx('item-image')}
                                            style={{
                                                backgroundImage: `url("${product.image}")`,
                                            }}
                                        ></div>
                                        <h3 className={cx('item-name')}>{product.name}</h3>
                                        <div className={cx('item-info')}>
                                            <span className={cx('item-price')}>{product.price} VND</span>
                                            <span className={cx('item-price')}>Total: {product.total}</span>
                                        </div>
                                        <div className={cx('edit-icon')}>
                                            <Link
                                                onClick={(e) => {
                                                    const id = product.id;
                                                    handleEdit(id);
                                                }}
                                                to={`/product/edit?id=${product.id}`}
                                            >
                                                <IconEdit />
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
}

export default Product;
