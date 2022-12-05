import React, { useState } from 'react';
import styles from './SupportRequest.module.sass';
import classNames from 'classnames/bind';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';

const cx = classNames.bind(styles);

function SupportRequest(props) {
    const [headerValue, setHeaderValue] = useState('');
    const [bodyContent, setBodyContent] = useState('');
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('header-wrapper')}>
                    <label className={cx('header-label')} for="header">
                        Tiêu đề
                    </label>
                    <input
                        className={cx('header-input')}
                        id="header"
                        name="headerValue"
                        type="text"
                        value={headerValue}
                    ></input>
                </div>
                <div className={cx('body-wrapper')}>
                    <label className={cx('body-label')} for="body">
                        Nội dung
                    </label>
                    <textarea
                        className={cx('body-content')}
                        id="body"
                        name="bodyContent"
                        // type="textarea"
                        value={bodyContent}
                    ></textarea>
                </div>

                <PrimaryButton>Gửi yêu cầu</PrimaryButton>
            </div>
        </div>
    );
}

export default SupportRequest;
