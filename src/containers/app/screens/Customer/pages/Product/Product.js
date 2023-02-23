import { Col, Divider, notification, Row } from 'antd';
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
    const products = useSelector((state) => {
        console.log('state', state);
        return state.product.listProduct.data;
    });
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
                        <Row>
                            <div
                                className={cx('image-bg')}
                                style={{
                                    backgroundImage: `url("https://ananas.vn/wp-content/uploads/desktop_productlist.jpg")`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            ></div>
                        </Row>
                        {products.state === 'SUCCESS' && (
                            // <div >
                            <Row className={cx('products-wrapper')} gutter={[24, 24]}>
                                {products?.data?.map((product, index) => {
                                    return (
                                        <Col key={product.id} xs={6}>
                                            <ProductItem
                                                image={product.Images[0]?.src}
                                                name={product.name}
                                                price={accounting.formatNumber(product.price)}
                                                stock={product.Stocks}
                                                index={index}
                                                sale={product.promo ? product.promo : null}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                            // </div>
                        )}
                        {/* <div className={cx('view-more')}>View more</div> */}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Product;
