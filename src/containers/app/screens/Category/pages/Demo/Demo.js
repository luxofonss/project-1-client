import React, { useState } from 'react';
import styles from './Demo.module.sass';
import classNames from 'classnames/bind';
import { Button, Modal } from 'antd';

const cx = classNames.bind(styles);

function Demo(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        console.log('open');
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={cx('container')}>
            <Button type="primary" onClick={showModal}>
                Add
            </Button>
            <Modal width={1000} title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}

export default Demo;
