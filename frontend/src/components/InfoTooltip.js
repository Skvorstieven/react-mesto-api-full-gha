// Модуль попапа с ошибкой
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function InfoTooltip(props) {
  const navigate = useNavigate();
  const { isOpen, onClose, isSuccessful } = props;

  // Обработчик закрытия попапа
  function handleClose() {
    onClose();
    if (isSuccessful) {
      navigate('/sign-in', { replace: true });
    }
  }

  // Обработчик клика по оверлэю
  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  return (
    <div className={isOpen ? 'popup popup_opened popup_type_info-tooltip' : 'popup popup_type_info-tooltip'} onClick={handleClickOutside}>

      <div className="popup__form-container">

        <button aria-label="Закрыть всплывающее окно" type="button" className="button button_type_exit" onClick={handleClose} />

        <div className={isSuccessful ? 'popup__info-tooltip-image popup__info-tooltip-image_type_success' : 'popup__info-tooltip-image popup__info-tooltip-image_type_error'} />

        <h2 className="popup__info-tooltip-text">{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>

      </div>

    </div>
  );
}
