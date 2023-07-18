//  Модуль попапа с добавлением новой карточки
import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../utils/useFormWithValidation';

export default function AddPlacePopup(props) {
  const { isOpen, onClose, onAddNewPlace } = props;

  // Запуск валидации формы
  const formValidation = useFormWithValidation(false);

  // Создание стэйтов
  const [formValue, setFormValue] = React.useState({
    name: '',
    link: '',
  });

  const [formValidity, setFormValidity] = React.useState({
    name: true,
    link: true,
  });

  // Очистка инпутов
  function ClearInputs() {
    setFormValue({
      name: '',
      link: '',
    });
    setFormValidity({
      name: true,
      link: true,
    });
  }

  // Действия при открытии попапа
  React.useEffect(() => {
    ClearInputs();
  }, [isOpen]);

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
    const { link } = formValue;

    onAddNewPlace({
      name,
      link,
    });

    ClearInputs();

    handleClose();
  }

  return (
    <PopupWithForm name="card" title="Новое место" buttonText="Создать" loadingText="Сохранение" onPopupClose={handleClose} onSubmit={handleSubmit} isValid={formValidation.isValid} {...props}>
      <input type="text" className={formValidity.name ? 'form__input' : 'form__input form__input_type_error'} placeholder="Название" name="name" minLength="2" maxLength="30" required value={formValue.name} onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error">{formValidation.errors.name}</span>
      <input type="url" className={formValidity.link ? 'form__input' : 'form__input form__input_type_error'} placeholder="Ссылка на картинку" name="link" required value={formValue.link} onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error">{formValidation.errors.link}</span>
    </PopupWithForm>
  );
}
