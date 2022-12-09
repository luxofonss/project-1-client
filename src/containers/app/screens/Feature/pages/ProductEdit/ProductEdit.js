import classNames from 'classnames/bind';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Fragment, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { BackIcon, IconUpload } from '~/assets/svgs';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { storage } from '~/firebase';
import { PRODUCT_EDIT, PRODUCT_GET_BY_ID, PRODUCT_DISABLE, PRODUCT_ENABLE } from '~/redux/actions/product';
import styles from './ProductEdit.module.sass';

const cx = classNames.bind(styles);

function ProductEdit() {
    const productEdit = useSelector((state) => state.productGetById);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const selectedId = localStorage.getItem('selectedId');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        console.log('get data');
        dispatch(PRODUCT_GET_BY_ID(selectedId));
    }, []);

    const onSubmit = (data) => {
        if (selectedImage !== null) {
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
                        const editedData = {
                            ...data,
                            image: URL,
                            id: selectedId,
                        };
                        console.log('dispatch has image');
                        dispatch(PRODUCT_EDIT(editedData));
                    });
                },
            );
        } else {
            const editedData2 = {
                ...data,
                image: productEdit?.products.data.image,
                id: selectedId,
            };
            console.log(editedData2);
            console.log('dispatch without image');
            dispatch(PRODUCT_EDIT(editedData2));
        }
    };

    const handleDisableProduct = (id) => {
        console.log('disable');
        dispatch(PRODUCT_DISABLE({ id: id }));
        dispatch(PRODUCT_GET_BY_ID(selectedId));
    };

    const handleEnableProduct = (id) => {
        console.log('enable');
        dispatch(PRODUCT_ENABLE({ id: id }));
        dispatch(PRODUCT_GET_BY_ID(selectedId));
    };

    return (
        <Fragment>
            <Link className={cx('back')} to="/product">
                <BackIcon /> Product
            </Link>
            <div className={cx('wrapper')}>
                <form onSubmit={handleSubmit(onSubmit)} className={cx('add-product-form')}>
                    {productEdit?.products && (
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
                                        defaultValue={productEdit?.products?.data?.name}
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
                                        defaultValue={productEdit?.products?.data?.category_id}
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
                                        defaultValue={productEdit?.products?.data?.description}
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
                                        defaultValue={productEdit?.products?.data?.color}
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
                                                defaultValue={productEdit?.products?.data?.price}
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
                                                defaultValue={productEdit?.products?.data?.prod_code}
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
                                                defaultValue={productEdit?.products?.data?.total}
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
                                                defaultValue={productEdit?.products?.data?.size}
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
                                            // handleChange(event);
                                            if (event.target.files[0]) {
                                                console.log('image upload');
                                                setSelectedImage(event.target.files[0]);
                                            }
                                        }}
                                    ></input>
                                </div>
                                <div
                                    style={{
                                        backgroundImage: `url(${
                                            selectedImage
                                                ? URL.createObjectURL(selectedImage)
                                                : productEdit?.products.data.image
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
                    <div className={cx('btn-wrapper')}>
                        <PrimaryButton type="submit">Publish</PrimaryButton>
                        {productEdit?.products?.data?.deleted_at && (
                            <PrimaryButton
                                type="button"
                                onClick={() => {
                                    handleEnableProduct(productEdit?.products?.data?.id);
                                }}
                                color="#59ea54"
                            >
                                Enable
                            </PrimaryButton>
                        )}
                        {!productEdit?.products?.data?.deleted_at && (
                            <PrimaryButton
                                type="button"
                                onClick={() => {
                                    handleDisableProduct(productEdit?.products?.data?.id);
                                }}
                                color="#ea5454"
                            >
                                Disable
                            </PrimaryButton>
                        )}
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default ProductEdit;
