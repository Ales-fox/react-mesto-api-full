import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const { isOpen, onClose } = props;
    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        }, e.target.querySelector('.button-submit'));
    }

    return (
        <PopupWithForm
            name='updateAvatar'
            formName='formUpdateAvatar'
            title='Обновить аватар'
            buttonSubmit='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input type="url" placeholder="Ссылка на аватарку" className="input input_url input_urlAvatar" id='urlAvatar'
                name="avatar" defaultValue="" ref={avatarRef} required />
            <span className="input-error input-error_urlAvatar"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;