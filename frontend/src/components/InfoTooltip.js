import React from 'react';

import success from '../images/popup__status_img_success.jpg';
import fail from '../images/popup__status_img_fail.jpg';

export default function InfoTooltip(props) {
    const { isOpen, onClose, isSuccess, message } = props;

    return (
        < section className={`popup ${isOpen && `popup_opened`}`}>
            <div className={`popup__container popup__status`}>
                <img className="popup__status_img" src={isSuccess ? success : fail} alt="Статус" />
                <h2 className={`popup__title popup__title_status `}>{message}</h2>
                <button className="button-close button" type="button" onClick={onClose} />
            </div>
        </section >
    )
}