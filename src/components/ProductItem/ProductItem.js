import classNames from 'classnames/bind';
import { IconStar } from '~/assets/svgs';
import SelectColorSize from '../SelectColorSize';
import styles from './ProductItem.module.sass';

const cx = classNames.bind(styles);

function ProductItem(props) {
    return (
        <div>
            <div style={props.width ? { width: props.width } : {}} className={cx('item')}>
                {props.sale !== null && <div className={cx('tag')}>{props.sale}% Sale off</div>}
                <div
                    style={{
                        backgroundImage: props.image
                            ? `url("${props.image}")`
                            : 'url("https://dichvubachkhoa.vn/wp-content/uploads/giay-sneaker-ananas.jpg")',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                    className={cx('image')}
                ></div>
                <div className={cx('top')}>
                    <div className={('text_over_flow_1', cx('name'))}>{props.name}</div>

                    {/* <div className={cx('star')}>
                        <IconStar width={20} height={18} /> (5)
                    </div> */}
                </div>
                <div className={cx('footer')}>
                    <div className={cx('price')}>{props.price} VND</div>
                    <div className={cx('button')}>
                        <SelectColorSize index={props.index} size={null} color={null} stocks={props.stock} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
