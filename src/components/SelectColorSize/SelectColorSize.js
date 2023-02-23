import { Modal, notification } from 'antd';
import classNames from 'classnames/bind';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import { ADD_PRODUCT_TO_CART } from '~/containers/app/screens/Customer/redux/action';
import { isEmptyValue } from '~/helpers/check';
import { GET_SIZE } from '~/redux/actions/size';
import AppButton from '../AppButton/AppButton';
import styles from './SelectColorSize.module.sass';

const cx = classNames.bind(styles);

const SelectColorSize = ({ index, size, color, name, stocks, value, required = false, ...props }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sizeSelected, setSizeSelected] = useState(size);
    const [quantity, setQuantity] = useState();
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState(false);
    const [colorSelected, setColorSelected] = useState(color);
    const [checkedList, setCheckedList] = useState([]);
    const sizes = useSelector((state) => state.size);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { register, setValue, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    const history = useHistory();

    const sizeList = useMemo(() => {
        let sizeListMemo = [];
        stocks.forEach((stock) => {
            sizeListMemo.push(stock.Size.id);
        });
        return sizeListMemo;
    }, [stocks]);

    const colorList = useMemo(() => {
        let colorListMemo = [];
        stocks.forEach((stock) => {
            if (stock.Size.id == sizeSelected) {
                colorListMemo.push(stock.Color.id);
            }
        });
        return colorListMemo;
    }, [sizeSelected]);

    const colorListRender = useMemo(() => {
        let colorListMemo = [];
        stocks.forEach((stock) => {
            if (!colorListMemo.some((e) => e.id == stock.Color.id)) {
                colorListMemo.push({ id: stock.Color.id, color: stock.Color.color });
            }
        });
        return colorListMemo;
    }, [stocks]);

    const remainingStock = useMemo(() => {
        let remain = [];
        stocks.every((stock) => {
            if (stock.Color.id == colorSelected && stock.Size.id == sizeSelected) {
                remain = stock.stock;
                return false;
            } else {
                return true;
            }
        });
        return remain;
    }, [colorSelected, sizeSelected]);

    const stockId = useMemo(() => {
        let stockId;
        stocks.every((stock) => {
            if (stock.Color.id == colorSelected && stock.Size.id == sizeSelected) {
                stockId = stock.id;
                return false;
            } else {
                return true;
            }
        });
        return stockId;
    }, [colorSelected, sizeSelected]);

    const onSubmit = () => {
        console.log('stock info', quantity, stockId);
        if (!quantity && !stockId) {
            setError(true);
            console.log('set error');
        } else {
            if (quantity > remainingStock) {
                setValidate(true);
            } else {
                setError(false);
                setValidate(false);
                console.log('data: ', stockId, quantity);
                dispatch(
                    ADD_PRODUCT_TO_CART({
                        stockId: stockId,
                        quantity: quantity,
                    }),
                );
                setIsModalOpen(false);
            }
        }
    };

    const showModal = () => {
        if (user.profile?.id) setIsModalOpen(true);
        else {
            console.log('auth');
            history.push('/auth');
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Fragment>
            <AppButton
                onClick={showModal}
                style={{
                    height: '32px',
                    padding: '0 8px',
                    fontSize: '14px',
                    fontWeight: '500',
                }}
            >
                Add to cart
            </AppButton>
            <Modal
                centered
                title="Choose size and color"
                open={isModalOpen}
                onOk={handleOk}
                footer={[]}
                onCancel={handleCancel}
            >
                <div className={cx('wrapper')}>
                    <div className={cx('size')}>
                        {sizes.state === REQUEST_STATE.SUCCESS &&
                            sizes?.data?.data.map((size, index) => {
                                return (
                                    <Fragment key={index}>
                                        <label
                                            htmlFor={`size${index}${size.id}`}
                                            className={
                                                sizeList.includes(size.id)
                                                    ? size.id.toString() === sizeSelected
                                                        ? cx('active-item')
                                                        : cx('item')
                                                    : cx('item-disabled')
                                            }
                                        >
                                            {size.size}
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                setValue('sizeId', e.target.value);
                                                setSizeSelected(e.target.value);
                                            }}
                                            id={`size${index}${size.id}`}
                                            value={size.id}
                                            type="radio"
                                        />
                                    </Fragment>
                                );
                            })}
                    </div>

                    <div style={{ marginTop: '24px' }} className={cx('color')}>
                        {colorListRender?.map((color) => {
                            return (
                                <Fragment>
                                    <label
                                        htmlFor={`color${index}${color.id}`}
                                        className={
                                            colorList.includes(color.id)
                                                ? color.id.toString() == colorSelected
                                                    ? cx('active-item')
                                                    : cx('item')
                                                : cx('item-disabled')
                                        }
                                    >
                                        {color.color}
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setValue('colorId', e.target.value);
                                            setColorSelected(color.id);
                                        }}
                                        id={`color${index}${color.id}`}
                                        value={color.id}
                                        name="color"
                                        type="radio"
                                        disabled={colorList.includes(color.id) ? false : true}
                                    />
                                </Fragment>
                            );
                        })}
                    </div>
                    <div className={cx('quantity')}>
                        <label htmlFor="">Quantity:</label>
                        <input
                            id={`number${index}`}
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder={
                                !isEmptyValue(remainingStock)
                                    ? `Please enter quantity smaller than ${remainingStock}`
                                    : 'Number of item...'
                            }
                        />
                        {quantity && validate && <div>Quantity must be smaller than {remainingStock}</div>}
                    </div>
                    {remainingStock && <div className={cx('total')}>Total: {remainingStock}</div>}
                    {error && (
                        <div style={{ color: 'red', marginBottom: '12px' }}>Please choose size color and quantity</div>
                    )}
                    <AppButton onClick={onSubmit} type="submit">
                        Submit
                    </AppButton>
                </div>
            </Modal>
        </Fragment>
    );
};
export default SelectColorSize;
