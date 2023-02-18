import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppSearchInput from '~/components/AppSearchInput';
import Cart from '~/components/Cart';
import styles from './Purchase.module.sass';

const cx = classNames.bind(styles);

function Purchase(props) {
    const [provinceCode, setProvinceCode] = useState(1);
    const [districtCode, setDistrictCode] = useState(null);
    console.log('rerender');

    useEffect(() => {
        console.log(provinceCode, districtCode);
    }, [provinceCode, districtCode]);

    function setProvince(e) {
        setProvinceCode(e);
    }

    return (
        <div className={cx('container')}>
            <AppForm>
                <Row gutter={24}>
                    <Col xs={14}>
                        <div className={cx('customer-info')}>
                            <h3>Customer information</h3>
                            <AppInput name="info.name" label="Full name" />
                            <AppInput type="email" name="info.email" label="Email" />
                            <AppInput type="number" name="info.phoneNumber" label="Phone Number" />
                            <Row gutter={24}>
                                <Col xs={8}>
                                    <AppSearchInput
                                        province={true}
                                        getProvinceCode={setProvince}
                                        name="info.province"
                                        label="Province"
                                    />
                                </Col>
                                <Col xs={8}>
                                    <AppSearchInput
                                        district={true}
                                        getDistrictCode={setDistrictCode}
                                        provinceCode={provinceCode}
                                        name="info.district"
                                        label="District"
                                    />
                                </Col>
                                <Col xs={8}>
                                    <AppSearchInput
                                        ward={true}
                                        districtCode={districtCode}
                                        name="info.ward"
                                        label="Ward"
                                    />
                                </Col>
                            </Row>
                            <AppInput type="text" name="info.detailAddress" label="Home number, Road" />
                        </div>
                        <div className={cx('ship')}>
                            <h3>Ship information</h3>
                            <div className={cx('ship-item')}>
                                <input type="radio" name="payment" value={0} />
                                <div>Credit card, Visa</div>
                            </div>
                            <div className={cx('ship-item')}>
                                <input type="radio" name="payment" value={1} />
                                <div>Digital wallet (Paypal, Momo,...)</div>
                            </div>
                            <div className={cx('ship-item')}>
                                <input type="radio" name="payment" value={2} />
                                <div>Cash on delivery (COD)</div>
                            </div>
                        </div>
                        <div className={cx('payment')}></div>
                    </Col>
                    <Col xs={10}>
                        <div className={cx('cart')}>
                            <Cart purchase style={{ width: '100%' }} />
                        </div>
                    </Col>
                </Row>
            </AppForm>
        </div>
    );
}

export default Purchase;
