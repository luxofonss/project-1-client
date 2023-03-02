import classNames from 'classnames/bind';
import styles from './OrderDetailItem.module.sass';

const cx = classNames.bind(styles);
function OrderDetailItem({ ...props }) {
    return <div className={cx('wrapper')}></div>;
}

export default OrderDetailItem;
