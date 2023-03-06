import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import { GET_ALL_PROMO } from '~/containers/app/screens/Promo/redux/action';
import styles from './ChoosePromo.module.sass';
import classNames from 'classnames/bind';
import accounting from 'accounting';

const cx = classNames.bind(styles);

const ChoosePromo = ({ onSubmit, ...props }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const promoList = useSelector((state) => state.promo.promoList);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(GET_ALL_PROMO({ isActive: true }));
    }, []);

    const handleChoosePromo = (id, percent, discount, code) => {
        onSubmit({ id: id, percent: percent, discount: discount, code: code });
    };
    return (
        <div>
            <div className={cx('button')} onClick={showModal}>
                Get voucher
            </div>
            <Modal footer={[]} title="Voucher" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {promoList.state === REQUEST_STATE.SUCCESS &&
                    promoList?.data?.data?.map((promo, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => handleChoosePromo(promo.id, promo.percent, promo.discount, promo.code)}
                                className={cx('promo-wrapper')}
                            >
                                {promo.percent ? (
                                    <div className={cx('header-2')}>
                                        <div>{promo.percent}% DISCOUNT</div>
                                        <div>Max {accounting.formatNumber(promo.discount)}</div>
                                    </div>
                                ) : (
                                    <div className={cx('header-1')}>{promo.discount} DISCOUNT PER ORDER</div>
                                )}
                                <div className={cx('description')}>{promo.description}</div>
                                <div className={cx('expiry')}>Expiry: {promo.expiry?.slice(0, 10)}</div>
                            </div>
                        );
                    })}
            </Modal>
        </div>
    );
};

export default ChoosePromo;
