import classNames from 'classnames/bind';
import styles from './PrimaryButton.module.sass';

const cx = classNames.bind(styles);

function PrimaryButton({ children, color, border, text, ...buttonProps }) {
    return (
        <button
            style={{ backgroundColor: color, border: `1px solid ${border}`, color: text }}
            className={cx('primary-btn')}
            {...buttonProps}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
