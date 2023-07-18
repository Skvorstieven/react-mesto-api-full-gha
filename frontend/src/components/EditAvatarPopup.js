// Модуль попапа редактирования аватара
import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../utils/useFormWithValidation';

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const { isOpen, onClose, onUpdateAvatar } = props;

  // Запуск валидации формы
  const formValidation = useFormWithValidation(false);

  // Создание стэйтов
  const [avatarValidity, setAvatarValidity] = React.useState(true);

  // Очистка инпута
  function ClearInputs() {
    avatarRef.current.value = '';
  }

  // Действия при открытии попапа
  React.useEffect(() => {
    setAvatarValidity(true);
    if (isOpen) {
      ClearInputs();
    }
  }, [isOpen]);

  // Обработчик изменения инпута ссылки на аватар
  function handleChange(e) {
    formValidation.handleChange(e);
    setAvatarValidity(e.target.checkValidity());
  }

  // Обработчик закрытия формы
  function handleClose() {
    onClose();
    formValidation.resetForm();
  }

  // Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    ClearInputs();

    handleClose();
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" loadingText="Сохранение" onPopupClose={handleClose} onSubmit={handleSubmit} isValid={formValidation.isValid} {...props}>
      <input ref={avatarRef} type="url" className={avatarValidity ? 'form__input' : 'form__input form__input_type_error'} placeholder="Ссылка на картинку" name="avatar" required onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error form__input-error_type_avatar">{formValidation.errors.avatar}</span>
    </PopupWithForm>
  );
}
