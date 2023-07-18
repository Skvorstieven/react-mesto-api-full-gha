import React from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';

// Импорт Контекстов
import CurrentUserContext from '../contexts/CurrentUserContext';
import IsLoadingContext from '../contexts/IsLoadingContext';
import ErrorContext from '../contexts/ErrorContext';

// Импорт утилит
import api from '../utils/api';
import {
  defaultSelectedCard,
  defaultCurrenUser,
} from '../utils/constants';
import auth from '../utils/auth';

// Импорт основных компонентов
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

// Импорт Попапов
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import PopupWithError from './PopupWithError';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';

export default function App() {
  // Создание стэйтов
  const [currentUser, setCurrentUser] = React.useState(defaultCurrenUser);
  const [userEmail, setUserEmail] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [mainError, setMainError] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState(defaultSelectedCard);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
  const [errorData, setErrorData] = React.useState('');

  const navigate = useNavigate();

  // Загрузка основных данных
  function handleFetchMainData() {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then((data) => {
        setCurrentUser(data[0]);
        setCards(data[1]);
      })
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => { setMainError(error); });
  }

  // Обработчик входа на сайт
  function handleLogin(email) {
    setIsLoggedIn(true);
    setUserEmail(email);
    navigate('/', { replace: true });
    handleFetchMainData();
  }

  // Настройка открытия тултипа
  function handleInfoTooltip(isSuccess) {
    setIsRegistrationSuccessful(isSuccess);
    setIsInfoTooltipOpen(true);
  }

  // Обработчик авторизации
  function handleAuthorization(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
      })
      .then(() => {
        handleLogin(email);
      })
      .catch(() => { handleInfoTooltip(false); });
  }

  // Обработчик регистрации
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        handleInfoTooltip(true);
      })
      .catch(() => {
        handleInfoTooltip(false);
      });
  }

  // Обработчик выхода из аккаунта
  function handleSignOut() {
    auth.logout();
    navigate('/sign-in', { replace: true });
  }

  // Настройка открытия попапа с ошибкой
  function handleCatchError(error) {
    setErrorData(error);
    setIsErrorPopupOpen(true);
  }

  // Проверка сохраненного токена
  function handleTokenCheck() {
    auth.checkToken()
      .then((res) => {
        if (res.ok) {
          handleLogin(res.email);
        }
      })
      .catch((error) => { handleCatchError(error); });
  }

  // Получение данных с сервера
  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  // Настройка функции "Лайк" у карточек
  function handleCardLikeClick(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeCardLikeState(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((error) => { handleCatchError(error); });
  }

  // Настройка открытия попапа удаления карточки
  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  }

  // Настройка закрытия попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsErrorPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(defaultSelectedCard);
    setIsInfoTooltipOpen(false);
  }

  // Обработчик сабмита формы удаления карточки
  function handleDeleteCardSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch((error) => { handleCatchError(error); })
      .finally(() => setIsLoading(false));
  }

  // Настройка открытия попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Обработчик сабмита формы редактирования профиля
  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);

    api.changeUserInfo(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => { handleCatchError(error); })
      .finally(() => setIsLoading(false));
  }

  // Настройка открытия попапа изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Обработчик сабмита формы изменения аватара
  function handleUpdateAvatar(newAvatarSrc) {
    setIsLoading(true);

    api.changeUserAvatar(newAvatarSrc)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => { handleCatchError(error); })
      .finally(() => setIsLoading(false));
  }

  // Настройка открытия попапа создания карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Обработчик сабмита формы создания карточки
  function handleAddPlace(cardData) {
    setIsLoading(true);

    api.addNewCard(cardData)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch((error) => { handleCatchError(error); })
      .finally(() => setIsLoading(false));
  }

  // Настройка открытия попапа с картинкой
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header userEmail={userEmail} onSignOut={handleSignOut} />

      <ErrorContext.Provider value={mainError}>
        <Routes>
          <Route
            path="/"
            element={(
              <ProtectedRouteElement
                element={Main}
                loggedIn={isLoggedIn}
                cards={cards}
                isLoaded={isLoaded}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLikeClick}
                onDeleteCardClick={handleDeleteCardClick}
              />
            )}
          />

          <Route path="/sign-in" element={<Login onLogin={handleAuthorization} onError={handleCatchError} />} />

          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />

          <Route path="/404" element={<PageNotFound />} />

          <Route path="*" element={<Navigate to="/404" />} />

        </Routes>
      </ErrorContext.Provider>

      <Footer />

      <IsLoadingContext.Provider value={isLoading}>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddPlace}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCardSubmit}
        />

      </IsLoadingContext.Provider>

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccessful={isRegistrationSuccessful}
      />

      <PopupWithError
        isOpen={isErrorPopupOpen}
        onClose={closeAllPopups}
        error={errorData}
      />

    </CurrentUserContext.Provider>
  );
}
