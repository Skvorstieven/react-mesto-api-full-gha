// Модуль попапа редактирования профиля
import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useFormWithValidation from '../utils/useFormWithValidation';

export default function EditProfilePopup(props) {
  const { onClose, onUpdateUser, isOpen } = props;
  // Подключение контекста о текущем пользователе
  const currentUser = React.useContext(CurrentUserContext);

  // Запуск валидации формы
  const formValidation = useFormWithValidation(true);

  // Создание стэйтов
  const [formValue, setFormValue] = React.useState({
    name: '',
    about: '',
  });

  const [formValidity, setFormValidity] = React.useState({
    name: true,
    about: true,
  });

  // Действия при открытии попапа
  React.useEffect(() => {
    setFormValue({
      name: currentUser.name,
      about: currentUser.about,
    });
    setFormValidity({
      name: true,
      about: true,
    });
  }, [currentUser, isOpen]);

  // Обработчик изменения инпута
  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    formValidation.handleChange(e);
    setFormValidity({ ...formValidity, [e.target.name]: e.target.checkValidity() });
  }

  // Обработчик закрытия формы
  function handleClose() {
    onClose();
    formValidation.resetForm();
  }

  // Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();

    const { name } = formValue;
    const { about } = formValue;

    onUpdateUser({
      name,
      about,
    });

    handleClose();
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить" loadingText="Сохранение" onPopupClose={handleClose} onSubmit={handleSubmit} isValid={formValidation.isValid} {...props}>
      <input type="text" className={formValidity.name ? 'form__input' : 'form__input form__input_type_error'} value={formValue.name} placeholder="Имя" name="name" minLength="2" maxLength="40" required onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error form__input-error_type_name">{formValidation.errors.name}</span>
      <input type="text" className={formValidity.about ? 'form__input' : 'form__input form__input_type_error'} value={formValue.about} placeholder="Род деятельности" name="about" minLength="2" maxLength="200" required onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error form__input-error_type_about">{formValidation.errors.about}</span>
    </PopupWithForm>
  );
}
