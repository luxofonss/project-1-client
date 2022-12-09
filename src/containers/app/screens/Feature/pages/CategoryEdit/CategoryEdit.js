import React, { Fragment } from 'react';
import styles from './CategoryEdit.module.sass';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BackIcon } from '~/assets/svgs';
import { Col, Row } from 'antd';

const cx = classNames.bind(styles);

function CategoryEdit(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <Fragment>
            <Link className={cx('back')} to="/category">
                <BackIcon /> Category
            </Link>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit(onSubmit)} className={cx('add-product-form')}>
                    <Row>
                        <Col xs={2}>
                            <div className={cx('form-item')}>
                                <label className={cx('label')} for="name">
                                    Tên sản phẩm
                                </label>
                                <input
                                    className={cx('input')}
                                    id="name"
                                    {...register('name', { required: true })}
                                    type="text"
                                    defaultValue=""
                                ></input>
                            </div>
                        </Col>
                        <Col xs={8}>test </Col>
                        <Col xs={14}>test </Col>
                    </Row>
                </form>
            </div>
        </Fragment>
    );
}

export default CategoryEdit;
