import React, { Fragment, useEffect, useState } from 'react';
import styles from './CategoryEdit.module.sass';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { BackIcon } from '~/assets/svgs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CATEGORY_LIST_REQUEST } from '~/redux/actions/category';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_GET } from '~/redux/actions/product';
import ProductForm from '~/components/ProductForm/ProductForm';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';

const cx = classNames.bind(styles);

function CategoryEdit(props) {
    const dispatch = useDispatch();
    const [cateData, setCateData] = useState();
    const [productsInCategory, setProductsInCategory] = useState();
    const { id } = useParams();
    const cateEdit = useSelector((state) => state.categories);
    const products = useSelector((state) => state.productGet);

    console.log('cateEdit', cateEdit);
    console.log('products', products);

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
        dispatch(PRODUCT_GET({ cate_id: id }));
    }, []);

    return (
        <Fragment>
            <Link className={cx('back')} to="/category">
                <BackIcon /> Category
            </Link>
            <div className={cx('container')}>
                {cateEdit.requestState === 'SUCCESS' && (
                    <form onSubmit={handleSubmit(onSubmit)} className={cx('form-wrapper')}>
                        <Row>
                            <Col xs={2}>
                                <div className={cx('form-item')}>
                                    <label className={cx('label')} for="cate_code">
                                        Mã danh mục
                                    </label>
                                    <input
                                        className={cx('input')}
                                        id="cate_code"
                                        {...register('cate_code', { required: true })}
                                        type="text"
                                        disabled
                                        defaultValue={cateEdit?.data?.data[0]?.cate_code}
                                    ></input>
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className={cx('form-item')}>
                                    <label className={cx('label')} for="name">
                                        Tên danh mục
                                    </label>
                                    <input
                                        className={cx('input')}
                                        id="name"
                                        {...register('name', { required: true })}
                                        type="text"
                                        defaultValue={cateEdit?.data?.data[0]?.name}
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
                                    <label className={cx('label')} for="description">
                                        Mô tả
                                    </label>
                                    <textarea
                                        className={cx('input', 'description')}
                                        id="description"
                                        {...register('description', { required: true })}
                                        type="text"
                                        defaultValue={cateEdit?.data?.data[0]?.description}
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
                    {products.requestState === 'SUCCESS' &&
                        products.data.data.map((product) => (
                            <Col className={cx('item-wrapper')} xs={3}>
                                <ProductForm product={product}></ProductForm>
                            </Col>
                        ))}
                    {products.requestState === 'ERROR' && <div>no product in this category</div>}
                </Row>
            </div>
        </Fragment>
    );
}

export default CategoryEdit;
