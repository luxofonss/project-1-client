import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckIcon, ChevronDown } from '~/assets/svgs';
import styles from './AppSearchInput.module.sass';

const cx = classNames.bind(styles);

const AppSearchInput = ({
    getProvinceCode,
    getDistrictCode,
    minWidth,
    name,
    required,
    valueField,
    nameField,
    label,
    ...props
}) => {
    const { register, setValue } = useFormContext();
    // const [selectValue, setSelectValue] = useState(options[0][valueField]);
    // const [selectValueName, setSelectValueName] = useState(options[0][nameField]);
    const [selected, setSelected] = useState('');
    const [active, setActive] = useState(0);
    const [iconClick, setIconClick] = useState(false);
    const [params, setParams] = useState('');
    const [options, setOptions] = useState();
    const selections = useRef();
    const wrapperRef = useRef();

    const handleSelect = (code, name, index) => {
        setSelected({ name: name, code: code });
        setActive(index);
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
        if (params !== '') {
            selections.current.classList.remove('hide');
        }
    }, [params]);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    console.log('props.provinceCode', props.provinceCode);

    useEffect(() => {
        const fetch = async () => {
            if (props.province === true) {
                const response = await axios.get(`https://provinces.open-api.vn/api/p`);
                setOptions({ status: response.status, data: response.data });
                setSelected({ name: response.data[0].name, code: response.data[0].code });
                return response.data;
            } else if (props.district === true) {
                const response = await axios.get(`https://provinces.open-api.vn/api/p/${props.provinceCode}?depth=2`);
                setOptions({ status: response.status, data: response.data.districts });
                setSelected({ name: response.data.districts[0].name, code: response.data.districts[0].code });
                getDistrictCode(response.data.districts[0].code);

                return response.data.districts;
            } else if (props.ward === true) {
                const response = await axios.get(`https://provinces.open-api.vn/api/d/${props.districtCode}?depth=2`);
                setOptions({ status: response.status, data: response.data.wards });
                setSelected({ name: response.data.wards[0].name, code: response.data.wards[0].code });
                return response.data.districts;
            }
        };
        fetch();
    }, [props.provinceCode, props.districtCode]);

    const handleSelectClick = () => {
        selections.current.classList.toggle('hide');
        setIconClick(!iconClick);
    };

    return (
        <div style={{ minWidth: minWidth ? minWidth : null }} ref={wrapperRef}>
            <div
                // value={selectValue}
                className={cx('form-select')}
                {...register(name, props.validate ? props.validate : { required: 'This field is required!' })}
            >
                <label className={cx(required ? 'required' : 'label')} htmlFor="select">
                    {label}
                </label>
                <div id="select" onClick={() => handleSelectClick()} className={cx('select-wrapper')}>
                    <div className={cx('selected-name')}>{selected.name}</div>
                    <div className={cx(iconClick ? 'click' : 'un-click', 'flex-center')}>
                        <ChevronDown />
                    </div>
                </div>
                <ul ref={selections} className={cx('selections', 'hide')} id="select">
                    {options?.status === 200 &&
                        options?.data.map((option, index) => {
                            return (
                                <li
                                    key={index}
                                    className={cx(active === index ? 'active' : '')}
                                    onClick={() => {
                                        if (props.province === true) {
                                            getProvinceCode(option.code);
                                        } else if (props.district === true) {
                                            getDistrictCode(option.code);
                                        }
                                        handleSelect(option.code, option.name, index);
                                    }}
                                >
                                    <div>{option.name}</div>
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

export default AppSearchInput;
