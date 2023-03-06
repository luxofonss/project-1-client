import React, { useEffect, useLayoutEffect, useState } from 'react';
import { DatePicker, Space } from 'antd';
import styles from './ColorSelection.module.sass';
import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SIZE } from '~/redux/actions/size';
import { REQUEST_STATE } from '~/app-configs';
import { GET_COLOR } from '~/redux/actions/color';

const cx = classNames.bind(styles);

const ColorSelection = ({ name, value, required = false, ...props }) => {
    const [checked, setChecked] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    const colors = useSelector((state) => {
        return state.color;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_COLOR());
    }, []);
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const onClickItem = (e) => {
        const colorindex = e.target.getAttribute('colorindex');
        let array = checked;
        let index = array.indexOf(colorindex);
        if (index !== -1) {
            array.splice(index, 1);
            setChecked([...array]);
        } else {
            setChecked([...checked, colorindex]);
        }
    };

    useLayoutEffect(() => {
        setCheckedList([...checked]);
        setValue(name, checked);
    }, [checked]);

    return (
        <div className={cx('wrapper')}>
            {colors.state === REQUEST_STATE.SUCCESS &&
                colors?.data?.data.map((color, index) => {
                    return (
                        <div
                            key={index}
                            onClick={onClickItem}
                            colorindex={color.id}
                            style={{ background: `${color.code}` }}
                            className={checked.includes(color.id.toString()) ? cx('active-item') : cx('item')}
                        >
                            {/* {color.color} */}
                        </div>
                    );
                })}
        </div>
    );
};
export default ColorSelection;
