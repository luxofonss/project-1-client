import { Button, Col, Modal, notification, Row, Space, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import AppButton from '~/components/AppButton/AppButton';
import AppDateInput from '~/components/AppDateInput';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import { GET_ALL_USERS, UPDATE_USER, UPDATE_USER_RESET } from '../../redux/action';
import styles from './UserList.module.sass';

const cx = classNames.bind(styles);

function UserList(props) {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.allUser);
    const updateUser = useSelector((state) => state.users.updateUser);

    useEffect(() => {
        dispatch(GET_ALL_USERS());
    }, []);

    useEffect(() => {
        if (updateUser?.state === REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Update user successfully!',
            });
        }
        if (updateUser?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Fail',
                description: 'Something went wrong, please try again!',
            });
        }
        dispatch(UPDATE_USER_RESET());
        dispatch(GET_ALL_USERS());
    }, [updateUser?.state]);
    const handleUpdateUser = (id) => {
        dispatch(UPDATE_USER({ id: id }));
    };

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => index + 1,
            key: 'stt',
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Percent',
            dataIndex: 'percent',
            key: 'percent',
        },
        {
            title: 'Gender',
            render: (_, record) => <div>{record.gender === true ? 'Male' : 'Female'}</div>,
            key: 'gender',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Role',
            render: (_, { role }) => (
                <Tag color={role === '0' ? 'green' : 'volcano'}>{role === '1' ? 'Admin' : 'User'}</Tag>
            ),

            key: 'role',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {record.role === '0' && <Button onClick={(e) => handleUpdateUser(record.id)}>Update</Button>}
                </Space>
            ),
        },
    ];
    return (
        <div className={cx('container')}>
            <Table columns={columns} dataSource={users?.state === REQUEST_STATE.SUCCESS ? users?.data?.data : []} />
        </div>
    );
}

export default UserList;
