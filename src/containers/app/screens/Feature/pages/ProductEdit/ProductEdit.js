import React, { Fragment, useEffect, useState } from 'react';
import styles from './ProductEdit.module.sass';
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
import { PRODUCT_ADD, PRODUCT_GET_BY_ID, PRODUCT_EDIT } from '~/redux/actions/product';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProductEdit() {
    const productEdit = useSelector((state) => state.productGetById);
    const productData = productEdit.products;
    const [selectedImage, setSelectedImage] = useState(productData?.image);
    const [selectedImageURL, setSelectedImageURL] = useState('');
    const dispatch = useDispatch();
    const selectedId = localStorage.getItem('selectedId');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(PRODUCT_GET_BY_ID(selectedId));
    }, [selectedId]);

    console.log(productData);
    console.log('selectedImage', selectedImage);
    useEffect(() => {
        console.log('image change', selectedImage);
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
                    setSelectedImageURL(URL);
                    console.log('set image url');
                });
            },
        );
    }, [selectedImage]);
    const onSubmit = (data) => {
        console.log(selectedImageURL);
        console.log('productData.image', productData.image);
        const editedData = {
            ...data,
            image: selectedImage ? selectedImageURL : productData.data.image,
            id: selectedId,
        };
        dispatch(PRODUCT_EDIT(editedData));
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
                    {productData && (
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
                                        defaultValue={productData.data.name}
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
                                        defaultValue={productData.data.category_id}
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
                                        defaultValue={productData.data.description}
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
                                        defaultValue={productData.data.color}
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
                                                defaultValue={productData.data.price}
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
                                                defaultValue={productData.data.prod_code}
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
                                                defaultValue={productData.data.total}
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
                                                defaultValue={productData.data.size}
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

                                <div
                                    style={{
                                        backgroundImage: `url(${
                                            selectedImage ? URL.createObjectURL(selectedImage) : productData.data.image
                                        })`,
                                        width: '250px',
                                        height: '250px',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        margin: '24px auto 0',
                                    }}
                                ></div>
                            </Col>
                        </Row>
                    )}
                    <PrimaryButton type="submit">Publish</PrimaryButton>
                </form>
            </div>
        </Fragment>
    );
}

export default ProductEdit;
