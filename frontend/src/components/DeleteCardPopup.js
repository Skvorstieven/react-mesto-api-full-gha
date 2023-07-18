// Модуль попапа с подтверждением удаления карточки
import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function DeleteCardPopup(props) {
  const { onClose } = props;
  return (
    <PopupWithForm name="confirmation" title="Вы уверены?" buttonText="Да" loadingText="Удаление" onPopupClose={onClose} isValid {...props} />
  );
}
