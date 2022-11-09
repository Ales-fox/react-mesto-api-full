import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card(props) {
    const { card } = props;
    const { likes, link, name } = card;
    const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст

    function handleClick() {
        props.onCardClick(card);
    }

    function handleLikeClick() {
        props.onCardLike(card);
    }

    function handleCardDelete() {
        props.onCardDelete(card);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Создаём переменную, ктр регулирует отображение иконки удаления (+ если card создана нами, - если кем-то другим)
    const cardDeleteButtonClassName = (
        `button-delete button ${isOwn ? '' : 'button-delete_inactive'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный нами(текущим пользователем)
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`button-like button ${isLiked ? 'button-like_active' : ''}`);

    return (
        <div className="card" >
            <img className="card__photo" src={link} alt={name} onClick={handleClick} />
            <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}></button>
            <div className="card__info">
                <h3 className="card__title over">{name}</h3>
                <div>
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <h4 className="card__count-like">{likes.length}</h4>
                </div>
            </div>
        </div>
    )
}