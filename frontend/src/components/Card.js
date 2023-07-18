// Модуль создающий карточки
import React from 'react';
import { placeholderImagePath } from '../utils/constants';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
  const {
    card, onCardLike, onCardClick, onDeleteCardClick,
  } = props;

  // Проверка является ли юзер владельцем карточки
  const currentUser = React.useContext(CurrentUserContext);
  const isOwned = card.owner === currentUser._id;

  // Добавление плэйсхолдера на случай ошибки загрузки картинки
  const [imageSrc, setImageSrc] = React.useState(card.link);

  function onImageError() {
    setImageSrc(placeholderImagePath);
  }

  // Настройка отображения кнопки лайка
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = (`button button_type_like ${isLiked && 'button button_type_like-active'}`);

  // Обработчик нажатия на кнопку лайка
  function handleLikeClick() {
    onCardLike(card);
  }

  // Обработчик нажатия на картинку
  function handleCardClick() {
    onCardClick(card);
  }

  // Обработчик нажатия на кнопку удаления карточки
  function handleDeleteClick() {
    onDeleteCardClick(card);
  }

  return (
    <li className="elements__item appear-animation">
      <img src={imageSrc} alt={card.name} className="elements__photo" onError={onImageError} onClick={handleCardClick} />
      {isOwned && <button aria-label="Удалить" type="button" className="button button_type_delete" onClick={handleDeleteClick} />}
      <div className="elements__text-container">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-container">
          <button aria-label="Лайк" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
