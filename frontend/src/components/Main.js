import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main(props) {
    const { onEditAvatar, onEditProfile, onAddPlace, onCardClick, onImageClick, cards, onCardLike, onCardDelete } = props;
    const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст
    
    return (
        <main>
            <section className="profile">
                <div className='profile__avatar-hover' onClick={onEditAvatar}><img className="profile__avatar"
                    src={currentUser.avatar} alt="Аватарка" /></div>
                <div className="profile__info">
                    <h1 className="profile__name over">{currentUser.name}</h1>
                    <button className="button-edit button" type="button" onClick={onEditProfile}></button>
                    <p className="profile__status over">{currentUser.about}</p>
                </div>
                <button className="button-add button" type="button" onClick={onAddPlace}></button>
            </section>

            <div className="cards">{
                cards.map((card) => (<Card key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                    onImageClick={onImageClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete} />))}
            </div>
        </main >
    );
}

export default Main;