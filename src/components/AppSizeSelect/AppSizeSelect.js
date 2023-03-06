import React, { useEffect, useLayoutEffect, useState } from 'react';
import { DatePicker, Space } from 'antd';
import styles from './AppSizeSelect.module.sass';
import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SIZE } from '~/redux/actions/size';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

const AppSizeSelect = ({ name, value, required = false, ...props }) => {
    const [checked, setChecked] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    const sizes = useSelector((state) => state.size);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_SIZE());
    }, []);
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const onClickItem = (e) => {
        const sizeindex = e.target.getAttribute('sizeindex');

        let array = checked;
        let index = array.indexOf(sizeindex);
        if (index !== -1) {
            array.splice(index, 1);
            setChecked([...array]);
        } else {
            setChecked([...checked, sizeindex]);
        }
    };

    useLayoutEffect(() => {
        setCheckedList([...checked]);
        setValue(name, checked);
    }, [checked]);

    return (
        <div className={cx('wrapper')}>
            {sizes.state === REQUEST_STATE.SUCCESS &&
                sizes?.data?.data.map((size, index) => {
                    return (
                        <div
                            key={index}
                            onClick={onClickItem}
                            sizeindex={size.id}
                            className={checkedList.includes(size.id.toString()) ? cx('active-item') : cx('item')}
                        >
                            {size.size}
                        </div>
                    );
                })}
        </div>
    );
};
export default AppSizeSelect;
