// Модуль основного контента
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ErrorContext from '../contexts/ErrorContext';
import { placeholderUserAvatarPath } from '../utils/constants';
import MainLoading from './MainLoading';
import MainError from './MainError';
import Card from './Card';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    cards,
    isLoaded,
    onCardLike,
    onDeleteCardClick,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
  } = props;
  const error = React.useContext(ErrorContext);

  // Добавление плэйсхолдера на случай ошибки загрузки аватара
  const [avatarSrc, setAvatarSrc] = React.useState();

  React.useEffect(() => {
    if (!isLoaded) {
      setAvatarSrc(placeholderUserAvatarPath);
    } else {
      setAvatarSrc(currentUser.avatar);
    }
  }, [isLoaded, currentUser.avatar]);

  function handleAvatarError() {
    setAvatarSrc(placeholderUserAvatarPath);
  }

  if (!isLoaded && error === undefined) { // отрисовка загрузки страницы
    return (
      <main className="content">
        <MainLoading />
      </main>
    );
  } if (error !== undefined) { // отрисовка сообщения об ошибке загрузки данных
    return (
      <main className="content">
        <MainError />
      </main>
    );
  }
  return ( // отрисовка контента
    <main className="content appear-animation">

      <section aria-label="Профиль" className="profile">

        <div className="profile__info-container">

          <div className="profile__avatar-container">
            <img src={avatarSrc} alt="Аватар пользователя" className="profile__avatar" onError={handleAvatarError} />
            <button aria-label="Изменить аватар профиля" type="button" className="button button_type_edit-avatar" onClick={onEditAvatar} />
          </div>

          <h1 className="profile__title">{currentUser.name}</h1>
          <button aria-label="Редактировать профиль" type="button" className="button button_type_edit" onClick={onEditProfile} />
          <p className="profile__subtitle">{currentUser.about}</p>

        </div>

        <button aria-label="Добавить новую карточку" type="button" className="button button_type_add" onClick={onAddPlace} />

      </section>

      <section aria-label="Фотогаллерея" className="elements">

        <ul className="elements__items">
          {cards.map((card) => (
            <Card
              card={card}
              userId={currentUser._id}
              onCardClick={onCardClick}
              onDeleteCardClick={onDeleteCardClick}
              onCardLike={onCardLike}
              key={card._id}
            />
          ))}
        </ul>

      </section>

    </main>
  );
}
