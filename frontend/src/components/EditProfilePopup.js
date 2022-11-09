import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const { isOpen, onClose } = props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    };
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        }, e.target.querySelector('.button-submit'));
    };

    return (
        <PopupWithForm
            name='edit'
            formName='formProfile'
            title='Редактировать профиль'
            buttonSubmit='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input type="text" placeholder="Имя" className="input input_name" id="name" name="name" minLength="2"
                maxLength="40" value={name} onChange={handleChangeName} required />
            <span className="input-error input-error_name"></span>
            <input type="text" placeholder="О себе" className="input input_status" id="status" name="about"
                minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} required />
            <span className="input-error input-error_status"></span>
        </PopupWithForm >
    )
}

export default EditProfilePopup;