// Модуль шаблон попапа с формой
import React from 'react';
import AnimatedEllipsis from './AnimatedEllipsis';
import IsLoadingContext from '../contexts/IsLoadingContext';

export default function PopupWithForm(props) {
  // Подключение контекста о загрузке
  const isLoading = React.useContext(IsLoadingContext);

  const {
    isOpen,
    isValid,
    onPopupClose,
    onSubmit,
    onClose,
    title,
    name,
    buttonText,
    loadingText,
    children,
  } = props;

  // Обработчик клика по оверлэю
  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={isOpen ? `popup popup_opened popup_type_${name}` : `popup popup_type_${name}`} onMouseDown={handleClickOutside}>

      <div className="popup__form-container">

        <button aria-label="Закрыть редактирование профиля" type="button" className="button button_type_exit" onClick={onPopupClose} />

        <h2 className="popup__title">{title}</h2>

        <form className="form" name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button aria-label={buttonText} type="submit" className={isValid ? 'button button_type_submit button_place_popup-submit' : 'button button_type_submit button_place_popup-submit button_disabled'} disabled={!isValid} name="popupSubmit">
            {isLoading ? <AnimatedEllipsis text={loadingText} /> : buttonText}
          </button>
        </form>

      </div>

    </div>
  );
}
