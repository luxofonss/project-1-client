import React, { Fragment, useEffect, useState } from 'react';
import styles from './AddProduct.module.sass';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BackIcon, IconPlus, IconTrash, IconUpload, IconX } from '~/assets/svgs';
import { storage } from '~/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { PRODUCT_ADD } from '~/containers/app/screens/Product/redux/action';
import { CATEGORY_LIST_REQUEST } from '~/containers/app/screens/Category/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Row, Col } from 'antd';
import { REQUEST_STATE } from '~/app-configs';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppSelectApi from '~/components/AppSelectApi';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';
import AppButton from '~/components/AppButton/AppButton';

const cx = classNames.bind(styles);

function AddProduct() {
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const product = useSelector((state) => {
        console.log(state);
        return state.product.createProduct;
    });
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log('submit', data);
        const storageRef = ref(storage, `/images/${selectedImage + v4()}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);
        setUploadingImage(true);
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
                    const uploadData = { ...data, images: [URL] };
                    console.log(uploadData);
                    setUploadingImage(false);
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

    const addStock = () => {
        setIndexes((prevIndexes) => {
            return [...prevIndexes, counter];
        });
        setCounter((prevCounter) => prevCounter + 1);
    };

    const removeStock = (index) => () => {
        setIndexes((prevIndexes) => [...prevIndexes.filter((item) => item !== index)]);
        setCounter((prevCounter) => prevCounter - 1);
    };

    const clearStocks = () => {
        setIndexes([0]);
    };

    return (
        <Fragment>
            <Link className={cx('back')} to="/product">
                <BackIcon /> Product
            </Link>
            <div className={cx('wrapper')}>
                <AppForm onSubmit={onSubmit}>
                    <div>
                        <Row gutter={32}>
                            <Col xs={14}>
                                <Row gutter={32}>
                                    <Col xs={12}>
                                        <AppInput name="name" label="Name" placeholder="Enter product name..." />
                                        <AppSelectApi apiURL="/api/category" name="categoryId" label="Category" />
                                        <AppSelectInput
                                            name={`gender`}
                                            label="Gender"
                                            options={['MEN', 'WOMEN', 'ALL']}
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <AppInput name="id" label="Product code" placeholder="Enter product code..." />
                                        <AppInput
                                            type="number"
                                            name="price"
                                            label="Price"
                                            placeholder="Enter product price..."
                                        />
                                        <AppSelectInput
                                            name={`form`}
                                            label="Form"
                                            options={['Low top', 'Hight top', 'Mid top', 'Mule']}
                                        />
                                    </Col>
                                    <Col xs={24}>
                                        <AppTextArea name="description" label="Product description" required={false} />
                                    </Col>
                                </Row>

                                {indexes.map((index) => {
                                    return (
                                        <div key={index}>
                                            <Row gutter={16}>
                                                <Col xs={7}>
                                                    <AppSelectInput
                                                        name={`stockData[${index}].size`}
                                                        label="Size"
                                                        options={[
                                                            '35',
                                                            '36',
                                                            '37',
                                                            '38',
                                                            '39',
                                                            '40',
                                                            '41',
                                                            '42',
                                                            '43',
                                                            '44',
                                                            '45',
                                                            '46',
                                                        ]}
                                                    />
                                                </Col>
                                                <Col xs={7}>
                                                    <AppSelectInput
                                                        name={`stockData[${index}].color`}
                                                        label="Color"
                                                        options={[
                                                            'offwhite',
                                                            'pineneedle',
                                                            'beige',
                                                            'grey',
                                                            'navy',
                                                            'brown',
                                                            'white',
                                                            'green',
                                                            'violet',
                                                            'pink',
                                                            'yellow',
                                                            'orange',
                                                            'red',
                                                            'black',
                                                        ]}
                                                    />
                                                </Col>
                                                <Col xs={7}>
                                                    <AppInput
                                                        name={`stockData[${index}].total`}
                                                        label="Total"
                                                        type="number"
                                                        placeholder="Number of products"
                                                    />
                                                </Col>
                                                <Col xs={3}>
                                                    <div className={cx('circle-button')} onClick={removeStock(index)}>
                                                        <IconX stroke="white" width={20} height={20} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                })}
                                <Row>
                                    <Col xs={24}>
                                        <div onClick={addStock} className={cx('circle-button')}>
                                            <IconPlus stroke="white" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={10}>
                                <div className={cx('upload-wrapper')}>
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
                                                handleChange(event);
                                            }}
                                        ></input>
                                    </div>
                                    {selectedImage && (
                                        <div
                                            style={{
                                                backgroundImage: `url(${URL.createObjectURL(selectedImage)})`,
                                                width: '200px',
                                                height: '200px',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                margin: '24px auto 0',
                                            }}
                                        ></div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div>
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
                    </div>
                </AppForm>
            </div>
        </Fragment>
    );
}

export default AddProduct;
