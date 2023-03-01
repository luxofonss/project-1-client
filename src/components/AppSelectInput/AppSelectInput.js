import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckIcon, ChevronDown } from '~/assets/svgs';
import styles from './AppSelectInput.module.sass';

const cx = classNames.bind(styles);

const AppSelectInput = ({ minWidth, name, required, options, valueField, nameField, label, ...props }) => {
    const { register, setValue } = useFormContext();
    const [selectValue, setSelectValue] = useState(valueField ? options[0][valueField] : options[0]);
    const [selectValueName, setSelectValueName] = useState(nameField ? options[0][nameField] : options[0]);
    const [active, setActive] = useState(0);
    const [iconClick, setIconClick] = useState(false);
    const selections = useRef();
    const wrapperRef = useRef();
    const _name = name;

    const handleSelect = (value, valueName, index) => {
        setValue(_name, value);
        setSelectValue(value);
        setSelectValueName(valueName);
        setActive(index);
        handleSelectClick();
    };

    const handleSelectClick = () => {
        selections.current.classList.toggle('hide');
        setIconClick(!iconClick);
    };

    const handleClick = (event) => {
        const { target } = event;

        if (!selections.current.classList.contains('hide'))
            if (!wrapperRef.current.contains(target)) {
                selections.current.classList.add('hide');
                setIconClick(!iconClick);
            }
    };

    useEffect(() => {
        setValue(_name, valueField ? options[0][valueField] : options[0]);
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);
    console.log('options: ', options);

    return (
        <div style={{ minWidth: minWidth ? minWidth : null }} ref={wrapperRef}>
            <div
                value={selectValue}
                className={cx('form-select')}
                {...register(name, props.validate ? props.validate : { required: 'This field is required!' })}
            >
                <label className={cx(required ? 'required' : 'label')} htmlFor="select">
                    {label}
                </label>
                <div id="select" onClick={() => handleSelectClick()} className={cx('select-wrapper')}>
                    <div>{selectValueName}</div>
                    <div className={cx(iconClick ? 'click' : 'un-click', 'flex-center')}>
                        <ChevronDown />
                    </div>
                </div>
                <ul ref={selections} className={cx('selections', 'hide')} id="select">
                    {valueField
                        ? options.map((option, index) => {
                              return (
                                  <li
                                      key={index}
                                      className={cx(active === index ? 'active' : '')}
                                      onClick={() => handleSelect(option[valueField], option[nameField], index)}
                                  >
                                      <div>{option[nameField]}</div>
                                      <div className={cx(active !== index ? 'hide' : '')}>
                                          <CheckIcon />
                                      </div>
                                  </li>
                              );
                          })
                        : options.map((option, index) => {
                              return (
                                  <li
                                      key={index}
                                      className={cx(active === index ? 'active' : '')}
                                      onClick={() => handleSelect(option, option, index)}
                                  >
                                      <div>{option}</div>
                                      <div className={cx(active !== index ? 'hide' : '')}>
                                          <CheckIcon />
                                      </div>
                                  </li>
                              );
                          })}
                </ul>
            </div>
        </div>
    );
};

export default AppSelectInput;
