import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import styles from './AppRadio.module.sass';
import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

const cx = classNames.bind(styles);

const AppRadio = ({ id, name, value, required = false, ...props }) => {
    const [checked, setChecked] = useState();
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const onChange = (e) => {
        setValue(name, value);
        setChecked(value);
    };

    return (
        <div className={cx('wrapper')}>
            <input
                id={id ? id : `radio-${value}`}
                className={cx('radio')}
                type="radio"
                {...register(name, {
                    ...(required ? { required: 'Vui lòng chọn' } : {}),
                    ...props.validate,
                })}
                value={value}
                name={name}
                checked={checked === value ? true : false}
                onChange={onChange}
                {...props}
            />
            <label className={required ? 'required, label' : 'label'} htmlFor={id ? id : `radio-${value}`}>
                {props.label}
            </label>
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </div>
    );
};
export default AppRadio;
