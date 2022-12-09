import React from 'react';
import classNames from 'classnames/bind';
import styles from './SuccessModal.module.sass';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton.js';
import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SuccessModal({ children, ...props }) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className={cx('submit-btn')}>
                    <PrimaryButton>Submit</PrimaryButton>
                </div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={cx('DialogOverlay')} />
                <Dialog.Content style={{ width: '560px', height: '483px' }} className={cx('DialogContent')}>
                    <div
                        style={{
                            width: '128px',
                            height: '128px',
                            backgroundSize: 'cover',
                            backgroundImage:
                                'url("https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/316158278_515737017270412_8186092024205025268_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=4b4EbrcjFQIAX-yWigk&_nc_ht=scontent.fsgn2-1.fna&oh=03_AdQEmx7mGgXxxRvyev8czVduO9VxpCkmn8soeLEoDLQ6zw&oe=63AE7F3E")',
                        }}
                    ></div>
                    <h3 className={cx('content-h3')}>Gửi yêu cầu thành công</h3>
                    <h4 className={cx('content-h4')}>
                        Chúng tôi sẽ liên hệ bạn khi <br /> có kết quả
                    </h4>
                    <PrimaryButton>
                        <Link className="normal-link" to="/contract-manager">
                            Quản lý yêu cầu
                        </Link>
                    </PrimaryButton>
                    <Link className={cx('back-home')} to="contract-manager">
                        Về trang chủ
                    </Link>
                    <Dialog.Close asChild>{children}</Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default SuccessModal;
