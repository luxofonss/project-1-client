import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import styles from './AppRadio.module.sass';
import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

const cx = classNames.bind(styles);

const AppRadio = ({ name, value, required = false, ...props }) => {
    const [checked, setChecked] = useState(false);
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const onChange = (e) => {
        setValue(name, value);
        setChecked(true);
    };

    return (
        <div className={cx('wrapper')}>
            <input
                id={`radio-${value.startPrice}`}
                className={cx('radio')}
                type="radio"
                {...register(name, {
                    ...(required ? { required: 'Vui lòng chọn ngày' } : {}),
                    ...props.validate,
                })}
                value={value}
                name={name}
                checked={checked}
                onChange={onChange}
                {...props}
            />
            <label className={required ? 'required, label' : 'label'} htmlFor={`radio-${value.startPrice}`}>
                {props.label}
            </label>
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </div>
    );
};
export default AppRadio;
