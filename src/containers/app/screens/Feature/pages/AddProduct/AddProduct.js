import React, { Fragment, useEffect, useState } from 'react';
import styles from './AddProduct.module.sass';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { BackIcon, IconUpload } from '~/assets/svgs';
import { storage } from '~/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { PRODUCT_ADD } from '~/redux/actions/product';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

function AddProduct() {
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const storageRef = ref(storage, `/images/${selectedImage + v4()}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
                    const uploadData = { ...data, image: URL };
                    console.log(uploadData);
                    dispatch(PRODUCT_ADD(uploadData));
                });
            },
        );
    };

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    return (
        <Fragment>
            <Link className={cx('back')} to="/product">
                <BackIcon /> Product
            </Link>
            <div className={cx('wrapper')}>
                <form onSubmit={handleSubmit(onSubmit)} className={cx('add-product-form')}>
                    <Row>
                        <Col xs={4}>
                            <div className={cx('form-item')}>
                                <label className={cx('label')} for="name">
                                    Tên sản phẩm
                                </label>
                                <input
                                    className={cx('input')}
                                    id="name"
                                    {...register('name', { required: true })}
                                    type="text"
                                    // value={headerValue}
                                ></input>
                            </div>

                            <div className={cx('form-select')}>
                                <label className={cx('label')} for="category">
                                    Thể loại
                                </label>
                                <select
                                    {...register('cate_code', { required: true })}
                                    className={cx('select-wrapper')}
                                    id="category"
                                >
                                    <option value="TD04">Áo thun</option>
                                    <option value="TD04">Sơ mi</option>
                                    <option value="TD04">Quần tây</option>
                                    <option value="TD04">Quần đùi</option>
                                </select>
                            </div>

                            <div className={cx('form-item')}>
                                <label className={cx('label')} for="description">
                                    Mô tả
                                </label>
                                <textarea
                                    className={cx('input', 'description')}
                                    id="description"
                                    {...register('description', { required: true })}
                                    type="text"
                                    // value={headerValue}
                                ></textarea>
                            </div>
                        </Col>
                        <Col xs={4}>
                            <div className={cx('form-item')}>
                                <label className={cx('label')} for="color">
                                    Màu sắc
                                </label>
                                <input
                                    className={cx('input')}
                                    {...register('color', { required: true })}
                                    id="color"
                                    type="text"
                                    // value={headerValue}
                                ></input>
                            </div>
                            <Row>
                                <Col xs={6}>
                                    <div className={cx('form-item')}>
                                        <label className={cx('label')} for="price">
                                            Giá (VND)
                                        </label>
                                        <input
                                            className={cx('input')}
                                            id="price"
                                            {...register('price', { required: true })}
                                            type="text"
                                            // value={headerValue}
                                        ></input>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className={cx('form-item')}>
                                        <label className={cx('label')} for="prod-code">
                                            Mã sản phẩm
                                        </label>
                                        <input
                                            className={cx('input')}
                                            id="prod-code"
                                            {...register('prod_code', { required: true })}
                                            type="text"
                                            // value={headerValue}
                                        ></input>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <div className={cx('form-item')}>
                                        <label className={cx('label')} for="total">
                                            Số lượng
                                        </label>
                                        <input
                                            className={cx('input')}
                                            id="total"
                                            {...register('total', { required: true })}
                                            type="number"
                                            // value={headerValue}
                                        ></input>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className={cx('form-select')}>
                                        <label className={cx('label')} for="size">
                                            Kích cỡ
                                        </label>
                                        <select
                                            {...register('size', { required: true })}
                                            className={cx('select-wrapper')}
                                            id="size"
                                        >
                                            <option value={0}>S</option>
                                            <option value={1}>M</option>
                                            <option value={2}>L</option>
                                            <option value={3}>XL</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={4}>
                            <div className={cx('upload')}>
                                <label className={cx('label')} for="image">
                                    <span style={{ display: 'block' }}>Tải lên hình ảnh</span>
                                    <IconUpload />
                                </label>
                                <input
                                    style={{ display: 'none' }}
                                    id="image"
                                    type="file"
                                    onChange={(event) => {
                                        handleChange(event);
                                    }}
                                ></input>
                            </div>
                            {selectedImage && (
                                <div
                                    style={{
                                        backgroundImage: `url(${URL.createObjectURL(selectedImage)})`,
                                        width: '250px',
                                        height: '250px',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        margin: '24px auto 0',
                                    }}
                                ></div>
                            )}
                        </Col>
                    </Row>
                    <PrimaryButton type="submit">Publish</PrimaryButton>
                </form>
            </div>
        </Fragment>
    );
}

export default AddProduct;
