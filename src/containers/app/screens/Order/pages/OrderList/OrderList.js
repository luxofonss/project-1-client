import React, { useEffect, useState } from 'react';
import styles from './OrderList.module.sass';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROMO, CREATE_PROMO, GET_ALL_ORDER } from '../../redux/action';
import { Button, Col, Modal, Row, Space, Table, Tag } from 'antd';
import { ORDER_STATUS, REQUEST_STATE } from '~/app-configs';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppButton from '~/components/AppButton/AppButton';
import AppSelectInput from '~/components/AppSelectInput';
import AppDateInput from '~/components/AppDateInput';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'STT',
        render: (_, record, index) => index + 1,
        key: 'stt',
    },
    {
        title: 'Full Name',
        dataIndex: 'userFullName',
        key: 'fullName',
        width: 160,
    },
    {
        title: 'Phone',
        dataIndex: 'userPhone',
        key: 'userPhone',
    },
    {
        title: 'Email',
        dataIndex: 'userEmail',
        key: 'userEmail',
    },
    {
        title: 'Address',
        dataIndex: 'userAddress',
        key: 'userAddress',
    },
    {
        title: 'Payment',
        dataIndex: 'payment',
        key: 'payment',
    },
    {
        title: 'Created at',
        render: (_, { createdAt }) => createdAt?.slice(0, 10),
        key: 'createdAt',
        width: 120,
    },
    {
        title: 'Promo',
        render: (_, { Promo }) => Promo?.code,
        key: 'promo',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => {
            return <Tag color={ORDER_STATUS[status]}>{status}</Tag>;
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`/admin/orders/${record.id}`}>
                    <Button>Detail</Button>
                </Link>
            </Space>
        ),
    },
];

const cx = classNames.bind(styles);

function OrderList(props) {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.order?.orderList);

    useEffect(() => {
        dispatch(GET_ALL_ORDER());
    }, []);

    return (
        <div className={cx('container')}>
            <Row gutter={64}>
                <Col xs={24}>
                    <div className="flex-between">
                        <h4>Orders list</h4>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={orderList.state === REQUEST_STATE.SUCCESS ? orderList?.data?.data : []}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default OrderList;
