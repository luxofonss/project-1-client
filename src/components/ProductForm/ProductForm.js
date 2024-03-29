import { accounting } from 'accounting';
import classNames from 'classnames/bind';
import { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IconEdit } from '~/assets/svgs';
import styles from './ProductForm.module.sass';

const cx = classNames.bind(styles);

function ProductForm(props) {
    const total = useMemo(() => {
        let totalProduct = 0;
        props.product.Stocks.map((stock) => {
            totalProduct += stock.stock;
        });
        return totalProduct;
    }, []);

    return (
        <Fragment>
            <div className={cx('item-container')}>
                <div
                    className={cx('item-image')}
                    style={{
                        backgroundImage: `url("${props.product?.Images[0]?.src}")`,
                    }}
                ></div>
                <h3 className={cx('item-name')}>{props.product.name}</h3>
                <div className={cx('item-info')}>
                    <span className={cx('item-price')}>{accounting.formatNumber(props.product.price)} VND</span>
                    <span className={cx('item-price')}>Total: {total}</span>
                </div>
                <div className={cx('bottom-sec')}>
                    <div
                        className={cx(
                            total <= 0 || props.product.deletedAt === null || props.product.isActive === true
                                ? 'product-inactive'
                                : 'product-active',
                        )}
                    >
                        {total <= 0 || props.product.deletedAt === null ? 'inactive' : 'active'}
                    </div>

                    <Link to={`/admin/product/edit/${props.product.id}`}>
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
