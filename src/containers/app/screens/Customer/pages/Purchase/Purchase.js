import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppSearchInput from '~/components/AppSearchInput';
import Cart from '~/containers/app/screens/Customer/components/Cart';
import { CREATE_ORDER } from '../../redux/action';
import styles from './Purchase.module.sass';

const cx = classNames.bind(styles);

function Purchase(props) {
    const [provinceCode, setProvinceCode] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState();
    const [cartInfo, setCartInfo] = useState();
    const [districtCode, setDistrictCode] = useState(null);
    const dispatch = useDispatch();
    console.log('rerender');

    useEffect(() => {
        console.log(provinceCode, districtCode);
    }, [provinceCode, districtCode]);

    function setProvince(e) {
        setProvinceCode(e);
    }
    const handleGetCartValue = (data) => {
        setCartInfo(data);
    };
    const onSubmit = (data) => {
        const submitData = {
            address:
                data.info.detailAddress + ' ' + data.info.ward + ' ' + data.info.district + ' ' + data.info.province,
            phoneNumber: data.info.phoneNumber,
            email: data.info.email,
            firstName: data.info.firstName,
            lastName: data.info.lastName,
            payment: paymentMethod,
            promoId: cartInfo.promoId ? cartInfo.promoId : '',
            stockInfo: cartInfo.stockInfo,
        };

        console.log('submit data', submitData);
        dispatch(CREATE_ORDER(submitData));
    };

    return (
        <div className={cx('container')}>
            <AppForm onSubmit={onSubmit}>
                <Row gutter={24}>
                    <Col xs={14}>
                        <div className={cx('customer-info')}>
                            <h3>SHIPPING INFORMATION</h3>
                            <Row gutter={24}>
                                <Col xs={12}>
                                    <AppInput name="info.firstName" label="First name" />
                                </Col>
                                <Col xs={12}>
                                    <AppInput name="info.lastName" label="Last name" />
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col xs={12}>
                                    <AppInput type="email" name="info.email" label="Email" />
                                </Col>
                                <Col xs={12}>
                                    <AppInput type="number" name="info.phoneNumber" label="Phone Number" />
                                </Col>
                            </Row>

                            <AppSearchInput
                                province={true}
                                getProvinceCode={setProvince}
                                name="info.province"
                                label="Province"
                            />

                            <AppSearchInput
                                district={true}
                                getDistrictCode={setDistrictCode}
                                provinceCode={provinceCode}
                                name="info.district"
                                label="District"
                            />

                            <AppSearchInput ward={true} districtCode={districtCode} name="info.ward" label="Ward" />

                            <AppInput type="text" name="info.detailAddress" label="Home number, Road" />
                        </div>
                        <div className={cx('ship')}>
                            <h3>PAYMENT METHOD</h3>
                            <div className={cx('ship-item')}>
                                <input
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    type="radio"
                                    name="payment"
                                    value="BANK"
                                    id="bank"
                                />
                                <div>Credit card, Visa</div>
                                <label htmlFor="bank"></label>
                            </div>
                            <div className={cx('ship-item')}>
                                <input
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    type="radio"
                                    name="payment"
                                    value="E-WALLET"
                                    id="e-wallet"
                                />
                                <div>Digital wallet (Paypal, Momo,...)</div>
                                <label htmlFor="e-wallet"></label>
                            </div>
                            <div className={cx('ship-item')}>
                                <input
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    id="cod"
                                />
                                <div>Cash on delivery (COD)</div>
                                <label htmlFor="cod"></label>
                            </div>
                        </div>
                        <div className={cx('payment')}></div>
                    </Col>
                    <Col xs={10}>
                        <div className={cx('cart')}>
                            <Cart onGetValue={handleGetCartValue} purchase style={{ width: '100%' }} />
                        </div>
                    </Col>
                </Row>
                <div style={{ marginTop: 24 }} className="flex-center">
                    <AppButton type="submit">Purchase</AppButton>
                </div>
            </AppForm>
        </div>
    );
}

export default Purchase;
