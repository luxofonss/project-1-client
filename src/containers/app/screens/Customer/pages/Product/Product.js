import { Carousel, Col, Divider, notification, Row, Spin } from 'antd';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
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
import { REQUEST_STATE } from '~/app-configs';
import { ADD_PRODUCT_TO_CART_RESET } from '../../redux/action';
import accounting from 'accounting';
import ColorSelection from '~/components/ColorSelection';

const cx = classNames.bind(styles);

function Product(props) {
    const products = useSelector((state) => state.product.listProduct);
    const categories = useSelector((state) => state.category?.categoryList?.data);
    const dispatch = useDispatch();
    const addProductToCategory = useSelector((state) => state.customer.addProductToCart);

    useEffect(() => {
        if (addProductToCategory.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Add product to cart successfully!',
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
    useEffect(() => {
        dispatch(PRODUCT_GET());
        dispatch(CATEGORY_LIST_REQUEST());
    }, []);

    const onSubmit = (data) => {
        console.log('data', data);
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
        dispatch(
            PRODUCT_GET({
                sizeId: data.size,
                categoryId: dataFilter.categoryId,
                form: dataFilter.formFilter,
                gender: data.gender,
                color: data.color,
            }),
        );
    };

    const imgs = [
        'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/306364146_2015783021925557_1903662116556994624_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=09Efm_ijjBQAX8rlny4&tn=8cxO5NLXVgS8b5XU&_nc_ht=scontent-hkg4-2.xx&oh=00_AfDjYc-0ouD9C0QVVu9bNRGAkZ5H8gpou0-3gxtaSHK2Xw&oe=63FC3A9E',
        'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/302195814_2008714422632417_707195722424640066_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=k8VgmV_rnvcAX9mREq3&_nc_ht=scontent-hkg4-1.xx&oh=00_AfDbCFSFcFnE8gE8U6wLcX7kyTcHI84LZ3NK16aC0rfDMw&oe=63FBF020',
        'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/302944940_2007413076095885_5844781582357933218_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=xxUd1gZ77GIAX-F-F-c&_nc_ht=scontent-hkg4-1.xx&oh=00_AfDnmU4_cX_sg3yUVLzBoGJeCn4KOH26P3VFeU9QYVlOug&oe=63FBDD6B',
        'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/300800975_2004782463025613_8452339877912986129_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=kMN8GV7--ZUAX_4z_4B&_nc_ht=scontent-hkg4-2.xx&oh=00_AfDlu8a_mXi3pMY7ZWsWnwMSMY5hGs5ru2w0pRlyX6KcZg&oe=63FBEC25',
        'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/272308677_1843912142445980_4455593664181753044_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=crDvQI-HjK8AX_2K1Zu&_nc_ht=scontent-hkg4-1.xx&oh=00_AfAKL1e23zfUc1SYkYPEdbqYoOZhPra44Vh6o4SZoWtbDQ&oe=63FBF0EA',
    ];

    console.log('state:', products.state);

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
                                <h4 className={cx('header')}>Price</h4>
                                <AppRadio value={12} name="price" label="$20 - $50" />
                                <AppRadio value={31} name="price" label="$50 - $100" />
                                <AppRadio value={221} name="price" label="$100 - $300" />
                                <AppRadio value={332} name="price" label="Greater than $300" />
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
                                {products?.data?.data?.map((product, index) => {
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
                                })}
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
