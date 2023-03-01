import React, { useEffect, useState } from 'react';
import styles from './PromoList.module.sass';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROMO, CREATE_PROMO } from '../../redux/action';
import { Col, Modal, Row, Space, Table, Tag } from 'antd';
import { REQUEST_STATE } from '~/app-configs';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppButton from '~/components/AppButton/AppButton';
import AppSelectInput from '~/components/AppSelectInput';
import AppDateInput from '~/components/AppDateInput';

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
                {/* <a>Invite {record.name}</a>
                <a>Delete</a> */}
            </Space>
        ),
    },
];

const cx = classNames.bind(styles);

function PromoList(props) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const promoList = useSelector((state) => state.promo.promoList);

    console.log('promoList', promoList);

    useEffect(() => {
        dispatch(GET_ALL_PROMO());
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onCreatePromo = (data) => {
        console.log(data);
        dispatch(CREATE_PROMO(data));
    };
    return (
        <div className={cx('container')}>
            <Row gutter={64}>
                <Col xs={24}>
                    <div className="flex-between">
                        <h4>Promos list</h4>
                        <AppButton
                            onClick={showModal}
                            style={{
                                height: '32px',
                                padding: '0 8px',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Add promo
                        </AppButton>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={promoList.state === REQUEST_STATE.SUCCESS ? promoList?.data?.data : []}
                    />
                </Col>
                <Col xs={24}>
                    <Modal
                        centered
                        // title="Choose size and color"
                        open={isModalOpen}
                        onOk={handleOk}
                        width={550}
                        footer={[]}
                        onCancel={handleCancel}
                    >
                        <h5>Create promo</h5>
                        <AppForm style={{ padding: '0 48px' }} onSubmit={onCreatePromo}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24}>
                                    <AppInput name="code" label="Code" />
                                </Col>
                                <Col xs={24}>
                                    <AppInput type="number" name="percent" label="Percent" />
                                </Col>
                                <Col xs={24}>
                                    <AppInput type="number" name="discount" label="Max discount (VND)" />
                                </Col>
                                <Col xs={24}>
                                    <AppInput name="description" label="Description" />
                                </Col>
                                <Col xs={24}>
                                    <AppSelectInput
                                        valueField="isActive"
                                        nameField="label"
                                        options={[
                                            { isActive: true, label: 'Active' },
                                            { isActive: false, label: 'Inactive' },
                                        ]}
                                        name="isActive"
                                        label="Status"
                                    />
                                </Col>
                                <Col xs={24}>
                                    <AppDateInput name="expiry" label="Expiry" />
                                </Col>
                            </Row>

                            <div className="bottom-right-submit">
                                <AppButton type="submit">Create</AppButton>
                            </div>
                        </AppForm>
                    </Modal>
                </Col>
            </Row>
        </div>
    );
}

export default PromoList;
