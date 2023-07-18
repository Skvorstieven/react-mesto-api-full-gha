// Модуль попапа с фотографией
import React from 'react';

export default function ImagePopup(props) {
  const { isOpen, onClose, card } = props;

  // Обработчик клика по оверлэю
  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={isOpen ? 'popup popup_opened popup_type_photo' : 'popup popup_type_photo'} onClick={handleClickOutside}>

      <div className="popup__photo-container">

        <button aria-label="Закрыть фотографию" type="button" className="button button_type_exit" onClick={onClose} />

        <img src={card.link} alt={card.name} className="popup__photo" />

        <p className="popup__photo-title">{card.name}</p>

      </div>
    </div>
  );
}
