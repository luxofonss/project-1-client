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
    const sizes = useSelector((state) => {
        console.log(state);
        return state.size;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_SIZE());
    }, []);
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const onChange = (e) => {
        setValue(name, value);
        setChecked(true);
    };

    const onClickItem = (e) => {
        const sizeIndex = e.target.getAttribute('sizeIndex');
        console.log(sizeIndex, e.target.innerHTML);
        let array = checked;
        let index = array.indexOf(sizeIndex);
        if (index !== -1) {
            array.splice(index, 1);
            setChecked([...array]);
        } else {
            setChecked([...checked, sizeIndex]);
        }
    };

    useLayoutEffect(() => {
        console.log('test');
        setCheckedList(checked);
        setValue(name, checked);
    }, [checked]);

    return (
        <div className={cx('wrapper')}>
            {sizes.state === REQUEST_STATE.SUCCESS &&
                sizes?.data?.data.map((size) => {
                    return (
                        <div
                            onClick={onClickItem}
                            sizeIndex={size.id}
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
