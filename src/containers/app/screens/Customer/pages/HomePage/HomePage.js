import accounting from 'accounting';
import { Carousel, Col, Divider, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import ProductItem from '~/components/ProductItem';
import { GET_SIZE } from '~/redux/actions/size';
import { CATEGORY_LIST_REQUEST } from '../../../Category/redux/action';
import { PRODUCT_GET } from '../../../Product/redux/action';
import styles from './HomePage.module.sass';

const cx = classNames.bind(styles);

function HomePage(props) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category?.categoryList);
    const products = useSelector((state) => state.product?.listProduct?.data);
    useEffect(() => {
        dispatch(PRODUCT_GET());
        dispatch(CATEGORY_LIST_REQUEST());
        dispatch(GET_SIZE());
    }, []);

    const categoryList = categories?.data?.data?.rows;

    const onChange = (currentSlide) => {
        // console.log(currentSlide);
    };

    const imgs = [
        'https://scontent.fhph1-2.fna.fbcdn.net/v/t1.15752-9/313916918_589727319821579_7334257236869657543_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=kFYKYeFW_p8AX-R6vJ8&_nc_ht=scontent.fhph1-2.fna&oh=03_AdTY4--ZGCnKc1ovrfgln6cwhRXdEo8YRURmGYQKD9LaDQ&oe=6428078A',
        'https://scontent.fhph1-3.fna.fbcdn.net/v/t1.15752-9/334573877_917255962640644_3794278279880240981_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=UBo318a9l9MAX8-z7Dh&_nc_oc=AQkqpj-LPo_Y_6VPWfbCYSLSavqmQkvGpqlVcU9LCD1La0LgfxoftPj3zJR9yMv1S2OAjKZVWpNm9jZNVWLpV_Mi&_nc_ht=scontent.fhph1-3.fna&oh=03_AdRj5cDP8dYLR9y-OW_rRgMRwer2PTWSyRuK_IEnNwrCvA&oe=64281234',
        'https://scontent.fhph1-3.fna.fbcdn.net/v/t1.15752-9/308509440_507412460886874_1663276275052894772_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=8qK4NN2RB_wAX9zmops&_nc_ht=scontent.fhph1-3.fna&oh=03_AdQiI-Rwz7o7XETPb8EVQvoCz0kpwnM8lLHut9mWfFO53w&oe=6427F6B8',
        'https://scontent.fhph1-2.fna.fbcdn.net/v/t1.15752-9/287129963_812878136786217_5297080395305685712_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=FsIfELRZWbcAX_YLRkg&_nc_ht=scontent.fhph1-2.fna&oh=03_AdTV0WFcyLkcHEtA-rEyRaJROmJFFUc46gCNBcElnZUntg&oe=6427F6EC',
        'https://scontent.fhph1-2.fna.fbcdn.net/v/t1.15752-9/270780464_1065053420954779_5323044563060479996_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=qfSqQhupucMAX9rTklN&_nc_ht=scontent.fhph1-2.fna&oh=03_AdSsM4wD9JhaDLik0cBKD3pv2cwvowV2wXP05ZXG-tk78Q&oe=6427FC2C',
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
                                            "url('https://scontent.fhph1-3.fna.fbcdn.net/v/t1.15752-9/334695820_1232508884017062_3236167228936700264_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=HPN9eAe7N8AAX_EGAff&_nc_ht=scontent.fhph1-3.fna&oh=03_AdTkLVBeNKYXQEGeF6s7edZoK6I9RwXAfvaZNZtyo5sDHQ&oe=6428285C')",
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
                                                    "url('https://scontent.fhph1-3.fna.fbcdn.net/v/t1.15752-9/263472462_1717378368469106_8037385631388094076_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=KVBht1Up_5MAX9NFWyd&_nc_ht=scontent.fhph1-3.fna&oh=03_AdRC3iUQE4l1KqFSyZNA_j_5lYuGLdrJKgPNnMSYiNYyIQ&oe=6427F162')",
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
                                    <div className={cx('right-1')}>
                                        <div
                                            style={{
                                                background:
                                                    "url('https://scontent.fhph2-1.fna.fbcdn.net/v/t1.15752-9/312614773_649308793375056_4471702986921592190_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=mbScLdHbdK0AX9yy8ke&_nc_ht=scontent.fhph2-1.fna&oh=03_AdQuK94H5ct8E0g7gJcURgitxmsFi1FY_9Z1rQ-_BgzAYA&oe=6427FDF1')",
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
                                    <div className={cx('right-2')}>
                                        <div
                                            style={{
                                                background:
                                                    "url('https://scontent.fhph1-1.fna.fbcdn.net/v/t1.15752-9/334562622_597269221877844_6880321016149664524_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=RgAWNeyTc7kAX_mCIZe&_nc_ht=scontent.fhph1-1.fna&oh=03_AdQPM1I3yc-KqEq7WC12MDtHjpP0s2U_cG-wqg8MlDdgwg&oe=6427FB03')",
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
