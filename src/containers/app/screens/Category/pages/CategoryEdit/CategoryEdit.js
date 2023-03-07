import React, { Fragment, useEffect, useState } from 'react';
import styles from './CategoryEdit.module.sass';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { BackIcon } from '~/assets/svgs';
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_UPDATE,
    CATEGORY_UPDATE_RESET,
} from '~/containers/app/screens/Category/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_GET } from '~/containers/app/screens/Product/redux/action';
import ProductForm from '~/components/ProductForm/ProductForm';
import AppButton from '~/components/AppButton/AppButton';
import Form from 'react-bootstrap/Form';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import { isEmptyValue } from '~/helpers/check';
import { Col, notification, Row } from 'antd';
import AppTextArea from '~/components/AppTextArea';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function CategoryEdit(props) {
    const dispatch = useDispatch();
    const [cateData, setCateData] = useState();
    const [productsInCategory, setProductsInCategory] = useState();
    const { id } = useParams();
    const cateEdit = useSelector((state) => state.category.categoryList);
    const productList = useSelector((state) => state.product.listProduct);
    const categoryUpdate = useSelector((state) => state.category.categoryUpdate);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (categoryUpdate?.state === REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Update category successfully!',
            });
        }
        if (categoryUpdate?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Fail',
                description: 'Something went wrong, please try again!',
            });
        }
        dispatch(CATEGORY_UPDATE_RESET());
        // dispatch(GET_ALL_USERS());
    }, [categoryUpdate?.state]);

    const onSubmit = (data) => {
        console.log(data);
        dispatch(
            CATEGORY_UPDATE({
                id: id,
                name: data.name,
                description: data.description,
            }),
        );
    };

    useEffect(() => {
        dispatch(CATEGORY_LIST_REQUEST({ id: id }));
        dispatch(PRODUCT_GET({ categoryId: id }));
    }, []);

    const onFilter = (data) => {
        if (data.id === 'all') {
            dispatch(PRODUCT_GET({ name: data.name }));
        } else dispatch(PRODUCT_GET(data));
    };

    return (
        <Fragment>
            <Link className={cx('back')} to="/admin/category">
                <BackIcon /> Category
            </Link>
            <div className={cx('container')}>
                {cateEdit?.requestState === 'SUCCESS' && (
                    <div className={cx('form-wrapper')}>
                        <AppForm onSubmit={onSubmit}>
                            <Row gutter={32}>
                                <Col xs={6}>
                                    <AppInput
                                        name="categoryCode"
                                        label="Mã danh mục"
                                        value={cateEdit?.data?.data.rows[0]?.id}
                                        disabled
                                    />
                                </Col>
                                <Col xs={6}>
                                    <AppInput
                                        name="name"
                                        label="Tên danh mục"
                                        defaultValue={cateEdit?.data?.data.rows[0]?.name}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <AppButton type="submit">Publish</AppButton>
                                </Col>
                                <Col xs={12}>
                                    <AppTextArea
                                        name="description"
                                        label="Description"
                                        defaultValue={cateEdit?.data?.data.rows[0]?.description}
                                    />
                                </Col>
                            </Row>
                        </AppForm>
                    </div>
                )}
                <Row>
                    <Col xs={24}>
                        <h5 className={cx('products-title')}>Products in category</h5>
                    </Col>
                    <Col xs={24}>
                        <div className={cx('header')}>
                            <AppForm onSubmit={(data) => onFilter(data)}>
                                <div className={cx('filter-form')}>
                                    <AppInput
                                        wrapperStyle={{ minWidth: '250px' }}
                                        required={false}
                                        label="Tìm theo tên"
                                        name="name"
                                    ></AppInput>
                                    <div
                                        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                    >
                                        <AppButton type="submit">Filter</AppButton>
                                    </div>
                                </div>
                            </AppForm>
                            <div className="bottom-right">
                                <Link to="/admin/product/add" className="normal-link-white">
                                    <AppButton>Add</AppButton>
                                </Link>
                            </div>
                        </div>
                    </Col>
                    {productList?.state === 'SUCCESS' && productList.data?.data.length > 0 ? (
                        productList.data?.data.map((product) => (
                            <Col key={product.id} className={cx('item-wrapper')} xs={6}>
                                <ProductForm product={product}></ProductForm>
                            </Col>
                        ))
                    ) : (
                        <div>No product</div>
                    )}
                    {cateEdit?.requestState === 'ERROR' && <div>no product in this category</div>}
                </Row>
            </div>
        </Fragment>
    );
}

export default CategoryEdit;
