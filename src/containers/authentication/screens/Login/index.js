import React, { useState, useEffect } from 'react';
import { Modal, notification, Spin } from 'antd';
import { REQUEST_STATE } from '~/app-configs';
import { LOGIN, SIGNUP } from '~/redux/actions/user';
import styles from './Login.module.sass';
import classNames from 'classnames/bind';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Eye, EyeSlash, FbIcon, GoogleIcon, TwitterIcon } from '~/assets/svgs';
import { getEmailValidationRegex, getPhoneNumberValidationRegex } from '~/helpers/validator';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppButton from '~/components/AppButton/AppButton';
// import images from '~/assets/images';

const cx = classNames.bind(styles);

function Login({ authAction = 'login' }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [action, setAction] = useState(authAction);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        dispatch(LOGIN(data));
    };

    const onSignUp = (data) => {
        dispatch(SIGNUP(data));
    };

    useEffect(() => {
        if (user.authState == REQUEST_STATE.SUCCESS && action === 'login') {
            history.push('/');
        }
        if (user.authState == REQUEST_STATE.SUCCESS && action === 'sign up') {
            setIsModalOpen(true);
        }
        if (user?.authState === REQUEST_STATE.ERROR && action === 'login') {
            notification.error({
                message: 'Fail',
                description: 'Email or password is incorrect!',
            });
        }
        if (user?.authState === REQUEST_STATE.ERROR && action === 'sign up') {
            notification.error({
                message: 'Fail',
                description: 'Email or phone number has been used!',
            });
        }
    }, [user?.authState]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className={cx('login-wrapper')}>
            <Modal
                centered
                // title="Choose size and color"
                open={isModalOpen}
                onOk={handleOk}
                width={550}
                footer={[]}
                onCancel={handleCancel}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                    <h4>Sign up successfully!</h4>
                    <Link to="/auth">
                        <AppButton onClick={handleReload}>Login</AppButton>
                    </Link>
                </div>
            </Modal>
            <Row className={cx('login-main', 'mt-0  gx-5')}>
                <Col className={cx('login')} xs={6}>
                    <div className={cx('header-nav', 'mt-2', 'd-flex justify-content-between')}>
                        <div
                            className={cx(
                                'nav-item',
                                'd-flex justify-content-center',
                                'fs-4',
                                action === 'login' ? 'active' : '',
                            )}
                            onClick={() => {
                                setAction('login');
                            }}
                        >
                            Sign in
                        </div>
                        <div
                            className={cx(
                                'nav-item',
                                'd-flex justify-content-center',
                                'fs-4',
                                action !== 'login' ? 'active' : '',
                            )}
                            onClick={() => {
                                setAction('sign up');
                            }}
                        >
                            Sign up
                        </div>
                    </div>
                    {action === 'login' && (
                        <Form onSubmit={handleSubmit(onSubmit)} className={cx('sign-form')}>
                            <Form.Group className="mb-4" controlId="formEmail">
                                <Form.Label className={cx('input-label')}>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                    autoComplete="false"
                                    {...register('email', {
                                        required: true,
                                        pattern: getEmailValidationRegex(),
                                    })}
                                />
                                {errors.email?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                                {errors.email?.type === 'pattern' && (
                                    <div className={cx('auth__error')}>Email is not valid!</div>
                                )}
                            </Form.Group>
                            <Form.Group className={cx('password-input', 'mb-4')} controlId="formPassword">
                                <Form.Label className={cx('input-label')}>Password</Form.Label>
                                <div
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className={cx('eye-icon', show === true ? '' : 'hidden')}
                                >
                                    <Eye />
                                </div>
                                <div
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className={cx('eye-icon', show === false ? '' : 'hidden')}
                                >
                                    <EyeSlash />
                                </div>
                                <Form.Control
                                    type={show ? 'text' : 'password'}
                                    {...register('password', { required: true })}
                                    className="effect effect__pw"
                                    placeholder="Enter your password"
                                    autoComplete="false"
                                />
                                {errors.password?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                                {/* <button className="auth__box is-flex al-center ju-center">
                                    {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : 'Đăng nhập'}
                                </button> */}
                            </Form.Group>
                            <div className={cx('submit-btn', 'btn-wrapper')}>
                                {/* <Button className={cx('submit')}>
                                    {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : 'Sign in'}
                                </Button> */}
                                <AppButton type="submit">
                                    {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : 'Sign in'}
                                </AppButton>
                            </div>
                        </Form>
                    )}
                    {action === 'login' && (
                        <div className={cx('social-login d-flex align-items-center flex-column mt-4')}>
                            <div className={cx('social-login-heading mb-3')}>Or login with</div>
                            <div className={cx('social')}>
                                <FbIcon />
                                <TwitterIcon />
                                <GoogleIcon />
                            </div>
                        </div>
                    )}
                    {action !== 'login' && (
                        <Form onSubmit={handleSubmit(onSignUp)} className={cx('sign-form mt-5')}>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group className="mb-1" controlId="firstName">
                                        <Form.Label className={cx('input-label')}>First name*</Form.Label>
                                        <Form.Control
                                            {...register('firstName', {
                                                required: true,
                                            })}
                                            name="firstName"
                                            type="text"
                                            placeholder="First name"
                                        />
                                        {errors.firstName?.type === 'required' && (
                                            <div className={cx('auth__error')}>This field is required!</div>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-1" controlId="lastName">
                                        <Form.Label className={cx('input-label')}>Last name*</Form.Label>
                                        <Form.Control
                                            {...register('lastName', {
                                                required: true,
                                            })}
                                            name="lastName"
                                            type="text"
                                            placeholder="First name"
                                        />
                                        {errors.lastName?.type === 'required' && (
                                            <div className={cx('auth__error')}>This field is required!</div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Form.Group className="mb-1" controlId="gender">
                                        <Form.Label className={cx('input-label')}>Gender*</Form.Label>
                                        <Form.Select
                                            {...register('gender', {
                                                required: true,
                                            })}
                                            aria-label="Default select example"
                                            default="1"
                                        >
                                            {/* <option>Open this select menu</option> */}
                                            <option value="0" default>
                                                Male
                                            </option>
                                            <option value="1">Female</option>
                                        </Form.Select>
                                        {/* 
                                        <Form.Control
                                            {...register('gender', {
                                                required: true,
                                            })}
                                            name="gender"
                                            type="select"
                                            placeholder="First name"
                                        /> */}
                                        {errors.gender?.type === 'required' && (
                                            <div className={cx('auth__error')}>This field is required!</div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-1" controlId="phoneNumber">
                                <Form.Label className={cx('input-label')}>Phone number*</Form.Label>
                                <Form.Control
                                    {...register('phoneNumber', {
                                        required: true,
                                        pattern: getPhoneNumberValidationRegex(),
                                    })}
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Enter your phone number"
                                />
                                {errors.phoneNumber?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                                {errors.phoneNumber?.type === 'pattern' && (
                                    <div className={cx('auth__error')}>Phone number is not valid!</div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="email">
                                <Form.Label className={cx('input-label')}>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                    autoComplete="false"
                                    {...register('email', {
                                        required: true,
                                        pattern: getEmailValidationRegex(),
                                    })}
                                    name="email"
                                />
                            </Form.Group>
                            {errors.email?.type === 'required' && (
                                <div className={cx('auth__error')}>This field is required!</div>
                            )}
                            <Form.Group className="mb-1" controlId="address">
                                <Form.Label className={cx('input-label')}>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                    autoComplete="false"
                                    {...register('address', {
                                        required: true,
                                    })}
                                    name="address"
                                />
                                {errors.address?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                            </Form.Group>
                            <Form.Group className={cx('password-input', 'mb-1')} controlId="formPassword">
                                <Form.Label className={cx('input-label')}>Password</Form.Label>
                                <div
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className={cx('eye-icon', show === true ? '' : 'hidden')}
                                >
                                    <Eye />
                                </div>
                                <div
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className={cx('eye-icon', show === false ? '' : 'hidden')}
                                >
                                    <EyeSlash />
                                </div>
                                <Form.Control
                                    type={show ? 'text' : 'password'}
                                    {...register('password', { required: true })}
                                    className="effect effect__pw"
                                    autoComplete="false"
                                    name="password"
                                    placeholder="Enter your password"
                                />
                                {errors.password?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                                {/* {errors.password?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )} */}
                            </Form.Group>
                            <div className={cx('mx-auto', 'btn-wrapper')}>
                                <AppButton type="submit">
                                    {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : 'Sign up'}
                                </AppButton>
                            </div>
                        </Form>
                    )}
                </Col>
                <Col className={cx('auth-right')} xs={6}>
                    {action === 'login' && (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundSize: 'cover',
                                backgroundImage:
                                    'url(https://img.freepik.com/premium-vector/happy-new-year-2023-chinese-new-year-year-cat-happy-lunar-new-year-2023-cat-illustration_692630-141.jpg?w=2000)',
                            }}
                        ></div>
                    )}
                    {action !== 'login' && (
                        <div className={cx('sign-up-right')}>
                            <div className={cx('mt-5 text-center mb-3')}> or Sign Up via</div>
                            <div
                                className={cx('button-white', 'mb-3 d-flex justify-content-center align-items-center')}
                            >
                                <div className={cx('logo-social-signup')}>
                                    <FbIcon />
                                </div>
                                <div>Facebook</div>
                            </div>
                            <div
                                className={cx('button-white', 'mb-3 d-flex justify-content-center align-items-center')}
                            >
                                <div className={cx('logo-social-signup')}>
                                    <TwitterIcon />
                                </div>
                                <div>Twitter</div>
                            </div>
                            <div
                                className={cx('button-white', 'mb-3 d-flex justify-content-center align-items-center')}
                            >
                                <div className={cx('logo-social-signup')}>
                                    <GoogleIcon />
                                </div>
                                <div>Google</div>
                            </div>
                            <span>
                                by clicking submit you agree to the
                                <a href="/"> Terms </a>
                                and
                                <a href="/"> Conditions </a>
                            </span>
                            <div
                                className={cx('mt-4 text-center')}
                                style={{
                                    width: '40%',
                                    height: '130px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundImage:
                                        'url("https://assets.stickpng.com/images/5842951fa6515b1e0ad75ad0.png")',
                                }}
                            ></div>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default Login;
