import { Carousel, Col, Divider, notification, Row, Spin } from 'antd';
import classNames from 'classnames/bind';
import { useHistory, useParams } from 'react-router-dom';
import ProductItem from '~/components/ProductItem';
import styles from './Product.module.sass';
import { PRODUCT_GET } from '../../../Product/redux/action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY_LIST_REQUEST } from '../../../Category/redux/action';
import AppCheckbox from '~/components/AppCheckbox';
import AppForm from '~/components/AppForm';
import AppRadio from '~/components/AppRadio';
import AppSizeSelect from '~/components/AppSizeSelect';
import AppButton from '~/components/AppButton/AppButton';
import { PRICE_RAGE, REQUEST_STATE } from '~/app-configs';
import { ADD_PRODUCT_TO_CART_RESET } from '../../redux/action';
import accounting from 'accounting';
import ColorSelection from '~/components/ColorSelection';
import { getArrayParams } from '~/helpers/validator';

const cx = classNames.bind(styles);

function Product(props) {
    const products = useSelector((state) => state.product.listProduct);
    const categories = useSelector((state) => state.category?.categoryList?.data);
    const addProductToCategory = useSelector((state) => state.customer.addProductToCart);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (addProductToCategory.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Change cart item successfully!',
            });
        }
        if (addProductToCategory?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Fail',
                description: 'Something wrong, please try again!',
            });
        }
        dispatch(ADD_PRODUCT_TO_CART_RESET());
    }, [addProductToCategory?.state]);

    const params = useParams();
    const searchParams = Object.fromEntries(new URLSearchParams(location.search.substring(1)));

    console.log(searchParams);

    getArrayParams(searchParams);

    useEffect(() => {
        dispatch(PRODUCT_GET(getArrayParams(searchParams)));
    }, [params]);

    useEffect(() => {
        dispatch(CATEGORY_LIST_REQUEST());
    }, []);

    const onSubmit = (data) => {
        console.log('data', data);
        // console.log(data.price.startPrice);
        // console.log(JSON.stringify(data.price));

        let dataFilter = {
            formFilter: [],
            categoryId: [],
        };
        data.category?.forEach((category) => {
            if (category !== false) {
                dataFilter.categoryId.push(category);
            }
        });
        data.form?.forEach((form) => {
            if (form !== false) {
                dataFilter.formFilter.push(form);
            }
        });
        const test = new URLSearchParams({
            sizeId: data.size,
            categoryId: dataFilter.categoryId,
            form: dataFilter.formFilter,
            price: data.price,
            gender: data.gender,
            color: data.color,
        }).toString();
        history.push(`product?${test}`);
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
            <Row>
                <Col xs={4}>
                    <AppForm onSubmit={onSubmit}>
                        <div className={cx('sider')}>
                            <AppButton className={cx('submit-filter')} type="submit">
                                Filter
                            </AppButton>
                            <div className={cx('filter-wrapper')}>
                                <h4 className={cx('header')}>Categories</h4>
                                {categories?.state === 'SUCCESS' && (
                                    <div>
                                        {categories?.data?.rows?.map((category, index) => (
                                            <AppCheckbox
                                                key={index}
                                                value={category.id}
                                                name={`category[${index}]`}
                                                label={category.name}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Divider />
                            <div className={cx('filter-wrapper')}>
                                <h4 className={cx('header')}>Gender</h4>
                                <AppRadio value={0} name="gender" label="Men" />
                                <AppRadio value={1} name="gender" label="Women" />
                                <AppRadio value={2} name="gender" label="All" />
                            </div>
                            <Divider />

                            <div className={cx('filter-wrapper')}>
                                <h4 className={cx('header')}>Form</h4>
                                <AppCheckbox value="Low top" name="form[0]" label="Low top" />
                                <AppCheckbox value="Hight top" name="form[1]" label="High Top" />
                                <AppCheckbox value="Mid top" name="form[2]" label="Mid Top" />
                                <AppCheckbox value="Mule" name="form[3]" label="Mule" />
                            </div>
                            <Divider />

                            <div className={cx('filter-wrapper')}>
                                <h4 className={cx('header')}>Price (VND)</h4>
                                {PRICE_RAGE.map((range) => {
                                    if (range.endPrice === 9999999999)
                                        return (
                                            <AppRadio
                                                id={`price${range.id}`}
                                                name="price"
                                                value={range.id}
                                                label={`Greater than ${accounting.formatNumber(range.startPrice)}`}
                                            />
                                        );
                                    else
                                        return (
                                            <AppRadio
                                                id={`price${range.id}`}
                                                name="price"
                                                value={range.id}
                                                label={`${accounting.formatNumber(
                                                    range.startPrice,
                                                )} - ${accounting.formatNumber(range.endPrice)}`}
                                            />
                                        );
                                })}
                            </div>
                            <Divider />

                            <div className={cx('filter-wrapper')}>
                                <h4 className={cx('header')}>Size</h4>
                                <AppSizeSelect name="size" />
                            </div>

                            <Divider />

                            <div className={cx('filter-wrapper')}>
                                <h4 className={cx('header')}>Color</h4>
                                <ColorSelection name="color" />
                            </div>
                        </div>
                    </AppForm>
                </Col>
                <Col xs={20}>
                    <div className={cx('main-view')}>
                        <Carousel dots={false} autoplay>
                            {imgs.map((src, index) => (
                                <div key={index}>
                                    <section
                                        className={cx('image-bg')}
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

                        {products.state === 'REQUEST' ? (
                            <div className={cx('product-state')}>
                                <Spin />
                            </div>
                        ) : products.state === 'SUCCESS' ? (
                            <Row className={cx('products-wrapper')} gutter={[24, 24]}>
                                {products?.data?.data?.length > 0 ? (
                                    products?.data?.data?.map((product, index) => {
                                        return (
                                            <Col key={product.id} xs={6}>
                                                <ProductItem
                                                    image={product.Images[0]?.src}
                                                    name={product.name}
                                                    price={accounting.formatNumber(product.price)}
                                                    stock={product.Stocks}
                                                    index={index}
                                                    id={product.id}
                                                    sale={product.promo ? product.promo : null}
                                                />
                                            </Col>
                                        );
                                    })
                                ) : (
                                    <div style={{ width: '100%' }} className="flex-center">
                                        <h4 style={{ color: 'white' }}>No product</h4>
                                    </div>
                                )}
                            </Row>
                        ) : (
                            <div className={cx('product-state')}>
                                <h3>Sorry, something went wrong!</h3>
                            </div>
                        )}
                        {/* <div className={cx('view-more')}>View more</div> */}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Product;
