import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import styles from './AppCheckbox.module.sass';
import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

const cx = classNames.bind(styles);

const AppCheckbox = ({ name, value, required = false, ...props }) => {
    const [checked, setChecked] = useState(false);
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const onChange = (e) => {
        if (e.target.checked === true) {
            setChecked(true);
            setValue(name, value);
        } else {
            setValue(name, false), setChecked(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <input
                id={`checkbox-${value}`}
                className={cx('checkbox')}
                type="checkbox"
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
            <label className={required ? 'required, label' : 'label'} htmlFor={`checkbox-${value}`}>
                {props.label}
            </label>
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </div>
    );
};
export default AppCheckbox;
