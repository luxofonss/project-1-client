import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import { GET_ALL_PROMO } from '~/containers/app/screens/Promo/redux/action';
import styles from './ChoosePromo.module.sass';
import classNames from 'classnames/bind';

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
        dispatch(GET_ALL_PROMO());
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
                    promoList?.data?.data?.map((promo) => {
                        return (
                            <div
                                onClick={() => handleChoosePromo(promo.id, promo.percent, promo.discount, promo.code)}
                                className={cx('promo-wrapper')}
                            >
                                {promo.percent ? (
                                    <div>{promo.percent} DISCOUNT</div>
                                ) : (
                                    <div>{promo.discount} DISCOUNT PER ORDER</div>
                                )}
                                <div>{promo.description}</div>
                                <div>{promo.quantity} left</div>
                                <div>Expiry: {promo.expiry?.slice(0, 10)}</div>
                            </div>
                        );
                    })}
            </Modal>
        </div>
    );
};

export default ChoosePromo;
