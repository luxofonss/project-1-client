import React from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.sass';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton.js';
import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Modal(props) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className={cx('submit-btn')}>{props.triggerBtn}</div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={cx('DialogOverlay')} />
                <Dialog.Content style={{ width: props.width, height: props.height }} className={cx('DialogContent')}>
                    {props.children}
                    <Dialog.Close asChild>{props.submitBtn}</Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Modal;
