import { Pagination } from 'antd';
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
import DropdownSelect from '~/components/DropdownSelect/DropdownSelect';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import ProductForm from '~/components/ProductForm/ProductForm';
import { CATEGORY_LIST_REQUEST } from '~/containers/app/screens/Category/redux/action';
import { PRODUCT_GET } from '~/containers/app/screens/Product/redux/action';
import { isEmptyValue } from '~/helpers/check';
import styles from './Product.module.sass';
const cx = classNames.bind(styles);

function Product(props) {
    const [categories, setCategories] = useState([]);
    const [format, setFormat] = useState(false); //false = image, true = table
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('dispatching');
        dispatch(PRODUCT_GET({ limit: limit, offset: offset }));
        dispatch(CATEGORY_LIST_REQUEST());
    }, [offset, limit]);

    const product = useSelector((state) => {
        console.log('state: ', state);
        return state.product.listProduct;
    });
    const categoryList = useSelector((state) => {
        return state.category.categoryList;
    });
    const productList = product?.data?.data?.rows;
    console.log('productList', productList);

    const options = [
        { name: 'Phương án A', value: 'A' },
        { name: 'Phương án B', value: 'B' },
        { name: 'Phương án C', value: 'C' },
        { name: 'Phương án E', value: 'E' },
        { name: 'Phương án F', value: 'F' },
    ];
    console.log('categoryList', categoryList);
    console.log('is empty', isEmptyValue(categoryList.data));

    const onFilter = (data) => {
        console.log(data);
        dispatch(PRODUCT_GET(data));
    };

    const onPaginationChange = (page, pageSize) => {
        console.log('page', page, pageSize);
        setOffset((page - 1) * pageSize);
        setLimit(pageSize);
    };

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <AppForm onSubmit={(data) => onFilter(data)}>
                        <div className={cx('filter-form')}>
                            <AppInput required={false} label="Tìm theo tên" name="name"></AppInput>
                            {!isEmptyValue(categoryList.data?.data?.rows) && (
                                <AppSelectInput
                                    required
                                    options={categoryList.data.data.rows}
                                    nameField="name"
                                    valueField="id"
                                    label="Danh mục"
                                    name="categoryId"
                                    minWidth={250}
                                ></AppSelectInput>
                            )}
                            <AppButton type="submit">Submit</AppButton>
                        </div>
                    </AppForm>

                    <div>
                        <div onClick={() => setFormat(false)}>luoi</div>
                        <div onClick={() => setFormat(true)}>bang</div>
                    </div>

                    <Link to="/admin/product/add" className="normal-link-white">
                        <PrimaryButton>Add</PrimaryButton>
                    </Link>
                </div>
                <Container className={cx('product-list')}>
                    <Row>
                        {format === false ? (
                            productList ? (
                                productList.map((product) => (
                                    <Col key={product.id} className={cx('item-wrapper')} xs={3}>
                                        <ProductForm product={product}></ProductForm>
                                    </Col>
                                ))
                            ) : (
                                'loading...'
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
                                          total={product?.data?.data?.count ? product?.data?.data?.count : 10}
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
