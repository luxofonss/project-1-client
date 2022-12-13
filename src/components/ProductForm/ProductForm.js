import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { IconEdit } from '~/assets/svgs';
import styles from './ProductForm.module.sass';

const cx = classNames.bind(styles);

function ProductForm(props) {
    return (
        <Fragment>
            <div className={cx('item-container')}>
                <div
                    className={cx('item-image')}
                    style={{
                        backgroundImage: `url("${props.product.image}")`,
                    }}
                ></div>
                <h3 className={cx('item-name')}>{props.product.name}</h3>
                <div className={cx('item-info')}>
                    <span className={cx('item-price')}>{props.product.price} VND</span>
                    <span className={cx('item-price')}>Total: {props.product.total}</span>
                </div>
                <div className={cx('bottom-sec')}>
                    <div
                        className={cx(
                            props.product.total <= 0 || props.product.deleted_at !== null
                                ? 'product-inactive'
                                : 'product-active',
                        )}
                    >
                        {props.product.total <= 0 || props.product.deleted_at !== null ? 'inactive' : 'active'}
                    </div>

                    <Link to={`/product/edit/${props.product.id}`}>
                        <div className={cx('edit-icon')}></div>
                        <IconEdit />
                    </Link>
                    {/* {props.children} */}
                </div>
            </div>
        </Fragment>
    );
}

export default ProductForm;
