import React, { useState } from 'react';
import styles from './ContractManager.module.sass';
import classNames from 'classnames/bind';
import { Radio, Space, Table, Tag, Select, Button } from 'antd';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ContractManager(props) {
    return (
        <form className={cx('add-product-form')}>
            <div className={cx('form-item')}>
                <label className={cx('label')} for="name">
                    Tên sản phẩm
                </label>
                <input
                    className={cx('input')}
                    id="name"
                    name="description"
                    type="text"
                    // value={headerValue}
                ></input>
            </div>
            <div className={cx('form-item')}>
                <label className={cx('label')} for="description">
                    Mô tả
                </label>
                <input
                    className={cx('input')}
                    id="description"
                    name="description"
                    type="text"
                    // value={headerValue}
                ></input>
            </div>
            <div className={cx('form-select')}>
                <label className={cx('label')} for="category">
                    Thể loại
                </label>
                <select className={cx('select-wrapper')} name="category" id="category">
                    <option value="0">Áo thun</option>
                    <option value="1">Sơ mi</option>
                    <option value="2l">Quần tây</option>
                    <option value="3">Quần đùi</option>
                </select>
            </div>
            <div className={cx('form-item')}>
                <label className={cx('label')} for="price">
                    Giá
                </label>
                <input
                    className={cx('input')}
                    id="price"
                    name="price"
                    type="text"
                    // value={headerValue}
                ></input>
            </div>
            <div className={cx('form-item')}>
                <label className={cx('label')} for="amount">
                    Số lượng
                </label>
                <input
                    className={cx('input')}
                    id="amount"
                    name="amount"
                    type="number"
                    // value={headerValue}
                ></input>
            </div>
            <div className={cx('form-item')}>
                <label className={cx('label')} for="color">
                    Màu sắc
                </label>
                <input
                    className={cx('input')}
                    id="color"
                    name="color"
                    type="text"
                    // value={headerValue}
                ></input>
            </div>
            <div className={cx('form-item')}>
                <label className={cx('label')} for="image">
                    Hình ảnh
                </label>
                <input
                    className={cx('input')}
                    id="image"
                    name="image"
                    type="file"
                    // value={headerValue}
                ></input>
            </div>
            <div className={cx('form-select')}>
                <label className={cx('label')} for="size">
                    Kích cỡ
                </label>
                <select className={cx('select-wrapper')} name="size" id="size">
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                </select>
            </div>
        </form>
    );
}

export default ContractManager;
