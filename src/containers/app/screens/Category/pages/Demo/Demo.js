import React, { useState } from 'react';
import styles from './Demo.module.sass';
import classNames from 'classnames/bind';
import { Button, Modal } from 'antd';

const cx = classNames.bind(styles);

function Demo(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={cx('container flex-center')}>
            <h3>Welcome to LUXSHOP admin dashboard</h3>
        </div>
    );
}

export default Demo;
