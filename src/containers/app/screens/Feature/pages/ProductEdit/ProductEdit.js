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
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { storage } from '~/firebase';
import { PRODUCT_EDIT, PRODUCT_GET, PRODUCT_DISABLE, PRODUCT_ENABLE } from '~/redux/actions/product';
import styles from './ProductEdit.module.sass';

const cx = classNames.bind(styles);

function ProductEdit() {
    const productEdit = useSelector((state) => state.productGet);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const { id, type } = useParams();
    console.log('productEdit', productEdit?.requestState);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        dispatch(PRODUCT_GET({ id: id }));
    }, []);

    const onSubmit = (data) => {
        console.log(data.status);
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
                            deleted_at: data.status == 0 ? '' : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                            id: id,
                        };
                        console.log('dispatch has image');
                        dispatch(PRODUCT_EDIT(editedData));
                    });
                },
            );
        } else {
            const editedData2 = {
                ...data,
                image: productEdit?.data?.data[0]?.image,
                deleted_at: data.status == 0 ? '' : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                id: id,
            };
            console.log(editedData2);
            console.log('dispatch without image');
            dispatch(PRODUCT_EDIT(editedData2));
        }
    };

    return (
        <Fragment>
            <Link className={cx('back')} to="/product">
                <BackIcon /> Product
            </Link>
            <div className={cx('wrapper')}>
                <form onSubmit={handleSubmit(onSubmit)} className={cx('add-product-form')}>
                    {productEdit.requestState === 'SUCCESS' && (
                        <Fragment>
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
                                            defaultValue={productEdit?.data?.data[0]?.name}
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
                                            defaultValue={productEdit?.data?.data[0]?.category_id}
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
                                            defaultValue={productEdit?.data?.data[0]?.description}
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
                                            defaultValue={productEdit?.data?.data[0]?.color}
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
                                                    defaultValue={productEdit?.data?.data[0]?.price}
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
                                                    defaultValue={productEdit?.data?.data[0]?.prod_code}
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
                                                    defaultValue={productEdit?.data?.data[0]?.total}
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
                                                    defaultValue={productEdit?.data?.data[0]?.size}
                                                >
                                                    <option value={0}>S</option>
                                                    <option value={1}>M</option>
                                                    <option value={2}>L</option>
                                                    <option value={3}>XL</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div className={cx('form-select')}>
                                                <label className={cx('label')} for="status">
                                                    Trạng thái
                                                </label>
                                                <select
                                                    {...register('status', { required: true })}
                                                    className={cx('select-wrapper')}
                                                    id="status"
                                                    defaultValue={
                                                        productEdit?.data?.data[0]?.deleted_at === null ? 0 : 1
                                                    }
                                                >
                                                    <option value={0}>Enable</option>
                                                    <option value={1}>Disable</option>
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
                                                    : productEdit?.data?.data[0]?.image
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
                                    <PrimaryButton type="submit">Publish</PrimaryButton>
                                </div>
                            </Row>
                        </Fragment>
                    )}
                </form>
            </div>
        </Fragment>
    );
}

export default ProductEdit;
