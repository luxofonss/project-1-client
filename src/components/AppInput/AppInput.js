import classNames from 'classnames/bind';
import { useForm, useFormContext } from 'react-hook-form';
import styles from './AppInput.module.sass';

const cx = classNames.bind(styles);
function AppInput({ name, minWidth, defaultValue, wrapperStyle = {}, required = false, ...props }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className={cx('input-wrapper')} style={wrapperStyle}>
            {props.label && (
                <label htmlFor={name} className={cx(required ? 'required' : '')}>
                    {props.label}
                </label>
            )}
            <input
                id={name}
                type={props.type ? props.type : 'text'}
                className={cx('input')}
                placeholder={props.placeholder ? props.placeholder : ''}
                autoComplete="off"
                defaultValue={defaultValue ? defaultValue : ''}
                {...register(name, {
                    ...(required ? { required: 'Trường này không được để trống' } : {}),
                    ...props.validate,
                })}
                {...props}
            />
            {errors[name]?.type === 'required' && <div className="error-message">{errors[name].message}</div>}
            {errors[name]?.type === 'pattern' && <div className="error-message">{errors[name].message}</div>}
        </div>
    );
}

export default AppInput;
