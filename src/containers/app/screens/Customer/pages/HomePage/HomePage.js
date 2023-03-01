import React, { useEffect, useMemo } from 'react';
import styles from './HomePage.module.sass';
import classNames from 'classnames/bind';
import { Col, Row, Carousel, Divider } from 'antd';
import AppButton from '~/components/AppButton/AppButton';
import background from '~/assets/images/background.jpg';
import { IconStar } from '~/assets/svgs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY_LIST_REQUEST } from '../../../Category/redux/action';
import { current } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '~/app-configs';
import { PRODUCT_GET } from '../../../Product/redux/action';
import ProductItem from '~/components/ProductItem';
import accounting from 'accounting';

const cx = classNames.bind(styles);

function HomePage(props) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category?.categoryList);
    const products = useSelector((state) => state.product?.listProduct?.data);
    useEffect(() => {
        dispatch(PRODUCT_GET());
        dispatch(CATEGORY_LIST_REQUEST());
    }, []);

    const categoryList = categories?.data?.data?.rows;

    console.log('categoryList', categoryList);
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    const imgs = [
        'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/306364146_2015783021925557_1903662116556994624_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=09Efm_ijjBQAX8rlny4&tn=8cxO5NLXVgS8b5XU&_nc_ht=scontent-hkg4-2.xx&oh=00_AfDjYc-0ouD9C0QVVu9bNRGAkZ5H8gpou0-3gxtaSHK2Xw&oe=63FC3A9E',
        'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/302195814_2008714422632417_707195722424640066_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=k8VgmV_rnvcAX9mREq3&_nc_ht=scontent-hkg4-1.xx&oh=00_AfDbCFSFcFnE8gE8U6wLcX7kyTcHI84LZ3NK16aC0rfDMw&oe=63FBF020',
        'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/302944940_2007413076095885_5844781582357933218_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=xxUd1gZ77GIAX-F-F-c&_nc_ht=scontent-hkg4-1.xx&oh=00_AfDnmU4_cX_sg3yUVLzBoGJeCn4KOH26P3VFeU9QYVlOug&oe=63FBDD6B',
        'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/300800975_2004782463025613_8452339877912986129_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=kMN8GV7--ZUAX_4z_4B&_nc_ht=scontent-hkg4-2.xx&oh=00_AfDlu8a_mXi3pMY7ZWsWnwMSMY5hGs5ru2w0pRlyX6KcZg&oe=63FBEC25',
        'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/272308677_1843912142445980_4455593664181753044_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=crDvQI-HjK8AX_2K1Zu&_nc_ht=scontent-hkg4-1.xx&oh=00_AfAKL1e23zfUc1SYkYPEdbqYoOZhPra44Vh6o4SZoWtbDQ&oe=63FBF0EA',
    ];
    return (
        <div className={cx('container')}>
            <div>
                <Carousel autoplay>
                    {imgs.map((src) => (
                        <div>
                            <section
                                className={cx('top-section')}
                                style={{
                                    backgroundImage: `url(${src})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            ></section>
                        </div>
                    ))}
                </Carousel>
            </div>
            {/* <section
                className={cx('top-section')}
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            ></section> */}

            <Divider>
                <h3 className={cx('heading')}>OUR CATEGORIES</h3>
            </Divider>
            {categories?.requestState === REQUEST_STATE.SUCCESS && (
                <section className={cx('categories')}>
                    <Row gutter={[30, 30]}>
                        <Col xs={12}>
                            <div className={cx('left-1')}>
                                <div
                                    style={{
                                        background:
                                            "url('https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/315715926_2071599396343919_5338240303691794685_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=qioXWdL1K6gAX-2NdEN&_nc_ht=scontent.fhan5-2.fna&oh=00_AfC7s-IeRarQF9Rga-JDUwPdm3DWP_DxZ3gDxU93bf5jDg&oe=63F895C8')",
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                    className={cx('image')}
                                ></div>
                                <div className={cx('name')}>{categoryList[0]?.name}</div>
                                <div className={cx('description')}>{categoryList[0]?.description}</div>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <Row gutter={[30, 30]}>
                                <Col xs={12}>
                                    <div className={cx('right-1')}>
                                        <div
                                            style={{
                                                background:
                                                    "url('https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/312716249_2052404871596705_6205041918050153472_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=kyDXWQSM3kQAX-mq2TQ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfC9Uz46J4pUcehgrfQ_jK_QKrIL37sNjqd-VQF0zSzlDg&oe=63FA1443')",
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                            className={cx('image')}
                                        ></div>

                                        <div className={cx('name')}>{categoryList[1]?.name}</div>
                                        <div className={cx('description')}>{categoryList[1]?.description}</div>
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div
                                        style={{
                                            background:
                                                "url('https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/306364146_2015783021925557_1903662116556994624_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=R4geU4q7IXcAX_sI12t&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCuML3qFubwjB9ii_KsIK0rpSwc7mztKQvN4IingIOxFw&oe=63FA405E')",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                        className={cx('right-1')}
                                    >
                                        <div
                                            style={{
                                                background:
                                                    "url('https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/277218154_1886911651479362_4955413408354261361_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=f1AXKOcQbCoAX9u7_k-&_nc_ht=scontent.fhan5-11.fna&oh=00_AfA_kIc0RqELyRKyFIDrUaHx0dldT7J1jgbvfAOiYVzWIg&oe=63F8F2C3')",
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                            className={cx('image')}
                                        ></div>
                                        <div className={cx('name')}>{categoryList[2]?.name}</div>
                                        <div className={cx('description')}>{categoryList[2]?.description}</div>
                                    </div>
                                </Col>
                                <Col xs={24}>
                                    <div
                                        style={{
                                            background:
                                                "url('https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/213153598_1703783239792205_8609044775481625139_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=A2KPhGWYHJ8AX8eTL2m&_nc_ht=scontent.fhan5-11.fna&oh=00_AfAJgdBB4DX-9VzSzCcBBrbgOKCjWUiWNcwh26JY41DnLg&oe=63F83343')",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                        className={cx('right-2')}
                                    >
                                        <div
                                            style={{
                                                background:
                                                    "url('https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/247977598_1811480602355801_3880567627003469686_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=tLq-o8iA5EMAX_Q8Yno&_nc_ht=scontent.fhan14-1.fna&oh=00_AfB24TkRgQPfI2Uy_kUF4V4og3kVf5miTPA4eUpg2wc-Lg&oe=63F96914')",
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                            className={cx('image')}
                                        ></div>
                                        <div className={cx('name')}>{categoryList[3]?.name}</div>
                                        <div className={cx('description')}>{categoryList[3]?.description}</div>
                                    </div>
                                </Col>
                            </Row>
                            {/* <Row gutter={[30, 30]}></Row> */}
                        </Col>
                    </Row>
                </section>
            )}
            <section className={cx('popular')}>
                <Divider>
                    <h3 className={cx('heading')}>OUR PRODUCTS</h3>
                </Divider>
                <Carousel dots={false} slidesToShow={4} autoplay afterChange={onChange}>
                    {products.state === REQUEST_STATE.SUCCESS &&
                        products?.data?.map((product, index) => {
                            return (
                                <div key={index}>
                                    <ProductItem
                                        width="80%"
                                        image={product.Images[0]?.src}
                                        name={product.name}
                                        price={accounting.formatNumber(product.price)}
                                        stock={product.Stocks}
                                        index={index}
                                        id={product.id}
                                        sale={product.promo ? product.promo : null}
                                    />
                                </div>
                            );
                        })}
                </Carousel>
            </section>
        </div>
    );
}

export default HomePage;
