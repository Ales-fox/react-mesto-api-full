import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const { isOpen, onClose } = props;
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({ name, link }, e.target.querySelector('.button-submit'));
    };

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeUrl(e) {
        setLink(e.target.value);
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            name='add'
            formName='formCard'
            title='Новое место'
            buttonSubmit='Создать'
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}>
            <input type="text" placeholder="Название" className="input input_name-of-place" id="name-of-place" name="name"
                value={name} minLength="2" maxLength="30" onChange={handleChangeName} required />
            <span className="input-error input-error_name-of-place"></span>
            <input type="url" placeholder="Ссылка на картинку" className="input input_url" id='url' name="link" value={link}
                onChange={handleChangeUrl} required />
            <span className="input-error input-error_url"></span>

        </PopupWithForm>
    );
}

export default AddPlacePopup;