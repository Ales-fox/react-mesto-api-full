import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
//Импорт компонентов
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import { api } from '../utils/api.js';
import * as authApi from '../utils/authApi.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('...@...ru');
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [information, setInformation] = useState({ isSuccess: false, message: '' });

  // Стейты используемые для контекста
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' }); //Если писать {}, то в name попадет при рендеринге undefined с ошибкой.Альтернатива - записать в input value={name || ''}
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    //Одновременный запрос на получение инфо о пользователе и карточек на сервере
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getDataCard()])
        .then(([itemsUserInfo, itemsCard]) => {
          setCurrentUser(itemsUserInfo.data);
          setCards(itemsCard.cards);
        }).catch(err => console.log(err));
    }
  }, [loggedIn]);

  //Открытие попапов по кнопке
  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  }
  const handleCardClick = (value) => {
    setIsImagePopupOpen(true);
    setSelectedCard(value);
  }

  //Выход из системы
  const handleLogOutClick = () => {
    localStorage.removeItem('jwt'); //Удаления токена из хранилища
    history.push('/sign-in'); //Переадресация 
  }

  const closeAllPopups = () => {
    setEditProfilePopup(false);
    setEditAvatarPopup(false);
    setAddPlacePopup(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  const closeInfoToolTip = () => {
    setInfoToolTipOpen(false);
  }
  //Обновление данных пользователя
  const handleUpdateUser = (obj, buttonSubmit) => {
    renderLoading(true, buttonSubmit);
    api.setUserInfo(obj)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, buttonSubmit);
      });
  }

  //Обновление аватара пользователя
  const handleUpdateAvatar = (obj, buttonSubmit) => {
    renderLoading(true, buttonSubmit);
    api.sendDataAvatar(obj)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, buttonSubmit);
      });
  }

  function handleAddPlaceSubmit(obj, buttonSubmit) {
    renderLoading(true, buttonSubmit);
    api.postCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, buttonSubmit);
      });
  }

  //Установка/Удаление лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      console.log(newCard);
      setCards((state) => {
        state.map((c) => c._id === card._id ? newCard : c)});
    }).catch(e => console.error(e));
  }

  //Удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(data => {
      setCards((state) => {
        state.filter(item => item._id !== card._id)});
    }).catch(e => console.error(e));
  }

  //Визуал того, что сервер в процессе исполнения задачи/грузится
  function renderLoading(isLoading, buttonSubmit) {
    if (isLoading) {
      buttonSubmit.textContent = 'Cохранение...';
    } else {
      buttonSubmit.textContent = 'Cохранить';
    }
  }

  const handleLogin = (email, password) => {
    return authApi.authorize(email, password)
      .then((data) => {
        if (!data?.token) { return Promise.reject('No data') };
        localStorage.setItem('jwt', data.token);
        setEmail(email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        setInformation({ isSuccess: false, message: 'Что-то пошло не так! Попробуйте еще раз.' })
        setInfoToolTipOpen(true);
        console.log(`Что-то пошло не так: ${err}`);
      })
  }

  const handleRegister = (email, password) => {
    return authApi.register(email, password)
      .then((data) => {
        if (!data) { return Promise.reject('No data') };
        setInformation({ isSuccess: true, message: 'Вы успешно зарегестрировались' });
        setInfoToolTipOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        setInformation({ isSuccess: false, message: 'Что-то пошло не так! Попробуйте еще раз.' });
        setInfoToolTipOpen(true);
        console.log(`При регистрации что-то пошло не так: ${err}`);
      });
  }

  const tokenCheck = () => {

    if (!localStorage.getItem('jwt')) return;
    const jwt = localStorage.getItem('jwt');
    //Проверяем токен пользователя
    authApi.getContent(jwt)
      .then((res) => {
        if (res) {
          const userData = {
            id: res.data._id,
            email: res.data.email
          }
          setLoggedIn(true);
          setEmail(userData.email);
          history.push('/');
        }
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className="page">
      <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeInfoToolTip} isSuccess={information.isSuccess} message={information.message} />
      
      <Switch>
        <Route path='/sign-in'>
          <Login onLogin={handleLogin} history={history} />          
        </Route>
        
        <Route path='/sign-up'>
          <Register onRegister={handleRegister} history={history} setInformation={setInformation} setInfoToolTipOpen={setInfoToolTipOpen} />
        </Route>       

        <ProtectedRoute exact path='/' loggedIn={loggedIn}>
          <CurrentUserContext.Provider value={currentUser}>
            <CardContext.Provider value={cards}>

              <Header email={email} onClick={handleLogOutClick} linkName='Выйти' link='sign-in' />
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
              <Footer />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} cards={cards} setCards={setCards} onAddPlace={handleAddPlaceSubmit} />
              <PopupWithForm
                name='delete'
                title='Вы уверены?'
                formName='formDelete'
                buttonSubmit='Да'
                isOpen={''}
                onClose={closeAllPopups} />
              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen} />

            </CardContext.Provider>
          </CurrentUserContext.Provider>
        </ProtectedRoute>
      </Switch >
    </div >
  );
}

export default App;