import classNames from 'classnames/bind';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { BackIcon, IconUpload } from '~/assets/svgs';
import { storage } from '~/firebase';
import {
    PRODUCT_EDIT,
    PRODUCT_GET,
    PRODUCT_DISABLE,
    PRODUCT_ENABLE,
    PRODUCT_EDIT_RESET,
} from '~/containers/app/screens/Product/redux/action';
import styles from './ProductEdit.module.sass';
import { REQUEST_STATE } from '~/app-configs';
import { notification, Spin } from 'antd';
import accounting from 'accounting';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppTextArea from '~/components/AppTextArea';
import AppButton from '~/components/AppButton/AppButton';

const cx = classNames.bind(styles);

function ProductEdit() {
    const productEdit = useSelector((state) => state.product.listProduct);
    const productUpdate = useSelector((state) => state.product.update);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const dispatch = useDispatch();
    const { id, type } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        dispatch(PRODUCT_GET({ id: id }));
    }, []);

    useEffect(() => {
        if (productUpdate?.state === REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Update product successfully!',
            });
        }
        if (productUpdate?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Fail',
                description: 'Something went wrong, please try again!',
            });
        }
        dispatch(PRODUCT_EDIT_RESET());
        // dispatch(GET_ALL_USERS());
    }, [productUpdate?.state]);

    const onSubmit = (data) => {
        if (selectedImage !== null) {
            setUploadingImage(true);
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
                            deletedAt: data.status == 0 ? '' : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                            id: id,
                        };

                        dispatch(PRODUCT_EDIT(editedData));
                        setUploadingImage(false);
                    });
                },
            );
        } else {
            const editedData2 = {
                ...data,
                image: productEdit?.data?.data[0]?.image,
                deletedAt: data.status == 0 ? '' : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                id: id,
            };
            console.log('edit data: ', editedData2);
            dispatch(PRODUCT_EDIT(editedData2));
        }
    };

    return (
        <Fragment>
            <Link className={cx('back')} to="/admin/product">
                <BackIcon /> Product
            </Link>
            <div className={cx('wrapper')}>
                <div className={cx('add-product-form')}>
                    {productEdit.state === 'SUCCESS' && (
                        <AppForm onSubmit={onSubmit}>
                            <Row>
                                <Col xs={4}>
                                    <AppInput
                                        label="Name"
                                        name="name"
                                        defaultValue={productEdit?.data?.data[0]?.name}
                                    />

                                    <AppInput
                                        label="Category"
                                        name="category"
                                        defaultValue={productEdit?.data?.data[0]?.category?.name}
                                    />

                                    <AppTextArea
                                        label="Description"
                                        name="description"
                                        defaultValue={productEdit?.data?.data[0]?.description}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <Row>
                                        <Col xs={6}>
                                            <AppInput
                                                label="Price (VND)"
                                                name="price"
                                                defaultValue={productEdit?.data?.data[0]?.price}
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <AppInput
                                                label="Code"
                                                name="id"
                                                defaultValue={productEdit?.data?.data[0]?.id}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <AppInput
                                                label="Total quantity"
                                                name="quantity"
                                                defaultValue={productEdit?.data?.data[0]?.Stocks.reduce(
                                                    (accumulator = 0, current, index) => {
                                                        return accumulator + current.stock;
                                                    },
                                                    0,
                                                )}
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <AppInput
                                                label="Promo"
                                                name="promo"
                                                defaultValue={productEdit?.data?.data[0]?.promo}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={4}>
                                    <div className={cx('upload')}>
                                        <label className={cx('label')} htmlFor="image">
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
                                                    : productEdit?.data?.data[0]?.Images[0]?.src
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
                            <Row>
                                <div className={cx('btn-wrapper')}>
                                    <AppButton
                                        disabled={
                                            product?.requestState === REQUEST_STATE.REQUEST || uploadingImage === true
                                                ? true
                                                : false
                                        }
                                        type="submit"
                                    >
                                        {product?.requestState === REQUEST_STATE.REQUEST || uploadingImage === true ? (
                                            <Spin />
                                        ) : (
                                            'Publish'
                                        )}
                                    </AppButton>
                                </div>
                            </Row>
                        </AppForm>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default ProductEdit;
