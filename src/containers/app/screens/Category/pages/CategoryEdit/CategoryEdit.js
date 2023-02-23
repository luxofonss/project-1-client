import React, { Fragment, useEffect, useState } from 'react';
import styles from './CategoryEdit.module.sass';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { BackIcon } from '~/assets/svgs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CATEGORY_LIST_REQUEST } from '~/containers/app/screens/Category/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_GET } from '~/containers/app/screens/Product/redux/action';
import ProductForm from '~/components/ProductForm/ProductForm';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import Form from 'react-bootstrap/Form';

const cx = classNames.bind(styles);

function CategoryEdit(props) {
    const dispatch = useDispatch();
    const [cateData, setCateData] = useState();
    const [productsInCategory, setProductsInCategory] = useState();
    const { id } = useParams();
    const cateEdit = useSelector((state) => state.category.categoryList);
    const productList = useSelector((state) => state.product.listProduct);

    console.log('productList', productList.data?.data?.rows);

    // if(cateEdit.categories.)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    useEffect(() => {
        console.log('get data');
        dispatch(CATEGORY_LIST_REQUEST({ id: id }));
        dispatch(PRODUCT_GET({ categoryId: id }));
    }, []);

    return (
        <Fragment>
            <Link className={cx('back')} to="/category">
                <BackIcon /> Category
            </Link>
            <div className={cx('container')}>
                {cateEdit?.requestState === 'SUCCESS' && (
                    <form onSubmit={handleSubmit(onSubmit)} className={cx('form-wrapper')}>
                        <Row>
                            <Col xs={2}>
                                <div className={cx('form-item')}>
                                    <label className={cx('label')} htmlFor="categoryCode">
                                        Mã danh mục
                                    </label>
                                    <input
                                        className={cx('input')}
                                        id="categoryCode"
                                        {...register('categoryCode', { required: true })}
                                        type="text"
                                        disabled
                                        defaultValue={cateEdit?.data?.data.rows[0]?.id}
                                    ></input>
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className={cx('form-item')}>
                                    <label className={cx('label')} htmlFor="name">
                                        Tên danh mục
                                    </label>
                                    <input
                                        className={cx('input')}
                                        id="name"
                                        {...register('name', { required: true })}
                                        type="text"
                                        defaultValue={cateEdit?.data?.data.rows[0]?.name}
                                    ></input>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <PrimaryButton type="submit">Publish</PrimaryButton>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <div className={cx('form-item')}>
                                    <label className={cx('label')} htmlFor="description">
                                        Mô tả
                                    </label>
                                    <textarea
                                        className={cx('input', 'description')}
                                        id="description"
                                        {...register('description', { required: true })}
                                        type="text"
                                        defaultValue={cateEdit?.data?.data.rows[0]?.description}
                                    ></textarea>
                                </div>
                            </Col>
                        </Row>
                    </form>
                )}
                <Row>
                    <Col xs={24}>
                        <h5 className={cx('products-title')}>Products in category</h5>
                    </Col>
                    <div className={cx('header')}>
                        <Form className={styles.search}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="search me-2"
                                aria-label="Search"
                            />
                            <PrimaryButton variant="outline-success">Filter</PrimaryButton>
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

                        <Link to="/admin/product/add" className="normal-link-white">
                            <PrimaryButton>Add</PrimaryButton>
                        </Link>
                    </div>
                    {productList?.state === 'SUCCESS' &&
                        productList.data?.data?.map((product) => (
                            <Col key={product.id} className={cx('item-wrapper')} xs={3}>
                                <ProductForm product={product}></ProductForm>
                            </Col>
                        ))}
                    {cateEdit?.requestState === 'ERROR' && <div>no product in this category</div>}
                </Row>
            </div>
        </Fragment>
    );
}

export default CategoryEdit;
