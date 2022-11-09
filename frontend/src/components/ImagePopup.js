import React from 'react';

export default function ImagePopup(props) {
    const { card, onClose, isOpen } = props;

    return (
        <section className={`popup popup_photo ${isOpen ? `popup_opened` : ''}`}>
            <div className='wrapper'>
                <div>
                    <img className="popup__bigPhoto" src={card?.link} alt={card?.name} />
                    <h3 className="popup__subtitle">{card?.name}</h3>
                </div>
                <button className="button-close button" type="button" onClick={onClose}></button>
            </div>
        </section>
    )
}