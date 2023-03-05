import { Col, notification, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import { IconEdit } from '~/assets/svgs';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import { UPDATE_PROFILE, UPDATE_PROFILE_RESET } from '~/redux/actions/user';
import styles from './Profile.module.sass';

const cx = classNames.bind(styles);

function Profile(props) {
    const [editable, setEditable] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.profile);
    const updateProfile = useSelector((state) => state.user.updateProfile);

    const onSubmit = (data) => {
        console.log('data: ', data);
        dispatch(UPDATE_PROFILE(data));
    };

    useEffect(() => {
        if (updateProfile == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Update profile successfully!',
            });
        }
        if (updateProfile === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Fail',
                description: 'Something wrong, please try again!',
            });
        }
        dispatch(UPDATE_PROFILE_RESET());
    }, [updateProfile]);

    const handleEnableUpdate = () => {
        setEditable(true);
    };
    return (
        <div className={cx('items-wrapper')}>
            <AppForm onSubmit={onSubmit}>
                <Row gutter={[32, 16]}>
                    <div onClick={handleEnableUpdate} className={cx('edit-wrapper')}>
                        <IconEdit />
                    </div>
                    <Col xs={12}>
                        <AppInput
                            name="firstName"
                            label="First name"
                            disabled={editable ? false : true}
                            defaultValue={user?.firstName}
                        />
                    </Col>
                    <Col xs={12}>
                        <AppInput
                            name="lastName"
                            label="Last name"
                            disabled={editable ? false : true}
                            defaultValue={user?.lastName}
                        />
                    </Col>
                    <Col xs={12}>
                        <AppInput
                            name="email"
                            label="Email"
                            disabled={editable ? false : true}
                            defaultValue={user?.email}
                            type="email"
                        />
                    </Col>
                    <Col xs={12}>
                        <AppSelectInput
                            options={[
                                { value: '0', name: 'Male' },
                                { value: '1', name: 'Female' },
                            ]}
                            valueField="value"
                            nameField="name"
                            name="gender"
                            label="Gender"
                            disabled={editable ? false : true}
                            defaultValue={user?.gender}
                        />
                    </Col>
                    <Col xs={12}>
                        <AppInput
                            name="address"
                            label="Address"
                            disabled={editable ? false : true}
                            defaultValue={user?.address}
                        />
                    </Col>
                    <Col xs={12}>
                        <AppInput
                            name="phoneNumber"
                            label="Phone number"
                            disabled={editable ? false : true}
                            defaultValue={user?.phoneNumber}
                        />
                    </Col>
                    {editable && (
                        <Col xs={24}>
                            <div className="bottom-right">
                                <AppButton type="submit">Confirm</AppButton>
                            </div>
                        </Col>
                    )}
                </Row>
            </AppForm>
        </div>
    );
}

export default Profile;
