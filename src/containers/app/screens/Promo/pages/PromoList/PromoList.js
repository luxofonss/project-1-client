import React, { useEffect } from 'react';
import styles from './PromoList.module.sass';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROMO } from '../../redux/action';
import { Col, Row, Space, Table, Tag } from 'antd';
import { REQUEST_STATE } from '~/app-configs';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppButton from '~/components/AppButton/AppButton';

const columns = [
    {
        title: 'STT',
        render: (_, record, index) => index + 1,
        key: 'stt',
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Percent',
        dataIndex: 'percent',
        key: 'percent',
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Expiry',
        render: (_, { expiry }) => expiry?.slice(0, 10),
        key: 'expiry',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'isActive',
        render: (_, { isActive }) => (
            <Tag color={isActive ? 'green' : 'volcano'}>{isActive ? 'Active' : 'Disabled'}</Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const cx = classNames.bind(styles);

function PromoList(props) {
    const dispatch = useDispatch();
    const promoList = useSelector((state) => state.promo.promoList);

    console.log('promoList', promoList);

    useEffect(() => {
        dispatch(GET_ALL_PROMO());
    }, []);
    return (
        <div className={cx('container')}>
            <Row gutter={64}>
                <Col xs={24}>
                    <h4>Promos list</h4>
                    <Table
                        columns={columns}
                        dataSource={promoList.state === REQUEST_STATE.SUCCESS ? promoList?.data?.data : []}
                    />
                </Col>
                <Col xs={24}>
                    <h4>Create promo</h4>
                    <AppForm>
                        <AppInput name="code" label="Code" />
                        <AppInput name="percent" label="Percent" />
                        <div className="bottom-right-submit">
                            <AppButton type="submit">Create</AppButton>
                        </div>
                    </AppForm>
                </Col>
            </Row>
        </div>
    );
}

export default PromoList;
