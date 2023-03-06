import React, { useEffect, useLayoutEffect, useState } from 'react';
import { DatePicker, Space } from 'antd';
import styles from './AppColorSelector.module.sass';
import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SIZE } from '~/redux/actions/size';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

const AppColorSelector = ({ name, stocks, value, required = false, ...props }) => {
    const [checked, setChecked] = useState([]);
    const [checkedList, setCheckedList] = useState([]);

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
        const colorIndex = e.target.getAttribute('colorIndex');
        let array = checked;
        let index = array.indexOf(colorIndex);
        if (index !== -1) {
            array.splice(index, 1);
            setChecked([...array]);
        } else {
            setChecked([...checked, colorIndex]);
        }
    };

    useLayoutEffect(() => {
        setCheckedList(checked);
        setValue(name, checked);
    }, [checked]);

    return (
        <div className={cx('wrapper')}>
            {stocks?.map((stock) => {
                return (
                    <div
                        onClick={onClickItem}
                        colorIndex={stock.Color.id}
                        className={checkedList.includes(stock.Color.id.toString()) ? cx('active-item') : cx('item')}
                    >
                        {stock.Color.color}
                    </div>
                );
            })}
        </div>
    );
};
export default AppColorSelector;
