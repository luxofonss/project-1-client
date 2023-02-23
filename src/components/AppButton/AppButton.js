import classNames from 'classnames/bind';
import styles from './AppButton.module.sass';

const cx = classNames.bind(styles);

function AppButton({
    children,
    type = 'button',
    color,
    border = 'none',
    text = '',
    form,
    isLoading = false,
    ...buttonProps
}) {
    return (
        <button
            type={type}
            style={{
                backgroundColor: isLoading ? '#fff' : color,
                border: `${border}`,
                color: text,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.5s',
            }}
            className={cx('primary-btn')}
            form={form}
            {...buttonProps}
        >
            {isLoading ? <Spin /> : children}
        </button>
    );
}

export default AppButton;
