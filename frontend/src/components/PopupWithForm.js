import React from 'react';

export default function PopupWithForm(props) {
    const { name, formName, title, buttonSubmit, children, isOpen, onClose, onSubmit } = props;

    return (
        <section className={`popup popup_form_${name} ${isOpen && `popup_opened`}`}>
            <form className={`popup__container popup__container_${name}`} action="URL" method="get" name={`${formName}`} onSubmit={onSubmit} >
                <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
                <>{children}</>
                <button className={`button button-submit`} type="submit">{buttonSubmit}</button>
                <button className="button-close button" type="button" onClick={onClose} />
            </form>
        </section>
    )

}