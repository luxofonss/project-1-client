import React from 'react';
import styles from './Demo.module.sass';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Demo(props) {
    return <div className={cx('container')}></div>;
}

export default Demo;
