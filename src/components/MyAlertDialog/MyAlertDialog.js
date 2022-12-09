import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from './MyAlertDialog.module.sass';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MyAlertDialog = () => (
    <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
            <button className={cx('Button violet')}>Cancel</button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className={cx('AlertDialogOverlay')} />
            <AlertDialog.Content className={cx('AlertDialogContent')}>
                <AlertDialog.Title className={cx('AlertDialogTitle')}>
                    Bạn có chắc chắn muốn hủy yêu cầu?
                </AlertDialog.Title>
                <AlertDialog.Description className={cx('AlertDialogDescription')}>
                    Yêu cầu không thể khôi phục lại khi đã hủy
                </AlertDialog.Description>
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                    <AlertDialog.Cancel asChild>
                        <button className={cx('Button mauve')}>Có</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button className={cx('Button red')}>Không</button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);

export default MyAlertDialog;
