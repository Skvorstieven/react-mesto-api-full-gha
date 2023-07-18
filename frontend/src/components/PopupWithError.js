// Модуль попапа с ошибкой
import React from 'react';

export default function PopupWithError(props) {
  const { isOpen, onClose, error } = props;
  // Обработчик клика по оверлэю
  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={isOpen ? 'popup popup_opened popup_type_error' : 'popup popup_type_error'} onClick={handleClickOutside}>

      <div className="popup__form-container">

        <button aria-label="Закрыть всплывающее окно" type="button" className="button button_type_exit" onClick={onClose} />

        <h2 className="popup__title popup__title_place_confirmation">
          Ошибка:
          {error.name}
          {' '}
          {error.message}
        </h2>

      </div>

    </div>
  );
}
