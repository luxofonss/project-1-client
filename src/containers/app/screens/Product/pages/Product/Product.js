import { Pagination, Spin } from 'antd';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import ProductForm from '~/components/ProductForm/ProductForm';
import { CATEGORY_LIST_REQUEST } from '~/containers/app/screens/Category/redux/action';
import { PRODUCT_GET } from '~/containers/app/screens/Product/redux/action';
import { isEmptyValue } from '~/helpers/check';
import styles from './Product.module.sass';
const cx = classNames.bind(styles);
import noProduct from '~/assets/images/no_product.png';

function Product(props) {
    const [categories, setCategories] = useState([]);
    const [format, setFormat] = useState(false); //false = image, true = table
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(PRODUCT_GET({ limit: limit, offset: offset }));
        dispatch(CATEGORY_LIST_REQUEST());
    }, [offset, limit]);

    const product = useSelector((state) => {
        return state.product.listProduct;
    });
    const categoryList = useSelector((state) => {
        return state.category?.categoryList;
    });
    const productList = product?.data?.data;
    const onFilter = (data) => {
        if (data.id === 'all') {
            dispatch(PRODUCT_GET({ name: data.name }));
        } else dispatch(PRODUCT_GET(data));
    };

    const onPaginationChange = (page, pageSize) => {
        setOffset((page - 1) * pageSize);
        setLimit(pageSize);
    };

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <AppForm onSubmit={(data) => onFilter(data)}>
                        <div className={cx('filter-form')}>
                            <AppInput
                                wrapperStyle={{ minWidth: '250px' }}
                                required={false}
                                label="Tìm theo tên"
                                name="name"
                            ></AppInput>
                            {!isEmptyValue(categoryList.data?.data?.rows) && (
                                <AppSelectInput
                                    required
                                    options={[{ name: 'All', id: 'all' }, ...categoryList.data.data.rows]}
                                    nameField="name"
                                    valueField="id"
                                    label="Danh mục"
                                    name="categoryId"
                                    minWidth={250}
                                ></AppSelectInput>
                            )}
                            <AppButton type="submit">Filter</AppButton>
                        </div>
                    </AppForm>
                    <div className="bottom-right">
                        <Link to="/admin/product/add" className="normal-link-white">
                            <AppButton>Add</AppButton>
                        </Link>
                    </div>
                </div>
                <Container className={cx('product-list')}>
                    <Row>
                        {format === false ? (
                            product.state === 'SUCCESS' && productList.length > 0 ? (
                                productList.map((product) => (
                                    <Col key={product.id} className={cx('item-wrapper')} xs={3}>
                                        <ProductForm product={product}></ProductForm>
                                    </Col>
                                ))
                            ) : product.state === 'SUCCESS' && productList?.length === 0 ? (
                                <div className="flex-center">
                                    <img src={noProduct} alt="no-product" />
                                </div>
                            ) : product.state === 'REQUEST' ? (
                                <div className="flex-center">
                                    <Spin />
                                </div>
                            ) : (
                                'FAIL'
                            )
                        ) : (
                            <div>table</div>
                        )}
                    </Row>
                    {format === false
                        ? productList && (
                              <Row>
                                  <div style={{ margin: '0 auto' }}>
                                      <Pagination
                                          defaultPageSize={10}
                                          showSizeChanger={true}
                                          pageSizeOptions={['10', '20', '30']}
                                          defaultCurrent={1}
                                          onChange={onPaginationChange}
                                          total={
                                              product?.data?.data?.rows?.length ? product?.data?.data?.rows?.length : 10
                                          }
                                      />
                                  </div>
                              </Row>
                          )
                        : ''}
                </Container>
            </div>
        </Fragment>
    );
}

export default Product;
