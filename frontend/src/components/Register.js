import React from 'react';
import useFormWithValidation from '../utils/useFormWithValidation';
import MainForm from './MainForm';

export default function Register(props) {
  const { onRegister } = props;

  // Запуск валидации формы
  const formValidation = useFormWithValidation(false);

  // Создание стэйта
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Обработчик изменения инпутов
  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    formValidation.handleChange(e);
  }

  // Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();

    if (formValue.password === formValue.confirmPassword) {
      onRegister(formValue.email, formValue.password);
      setFormValue({ email: '', password: '', confirmPassword: '' });
    }
  }

  return (
    <MainForm name="register" title="Регистрация" buttonText="Зарегистрироваться" isValid={formValidation.isValid} onSubmit={handleSubmit}>
      <input className="form__input form__input_place_login" type="email" name="email" autoComplete="email" value={formValue.email} placeholder="Email" required onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error">{formValidation.errors.username}</span>
      <input className="form__input form__input_place_login" type="password" name="password" autoComplete="new-password" value={formValue.password} minLength="2" maxLength="30" placeholder="Пароль" required onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error">{formValidation.errors.password}</span>
      <input className="form__input form__input_place_login" type="password" name="confirmPassword" autoComplete="new-password" value={formValue.confirmPassword} minLength="2" maxLength="30" placeholder="Повторите пароль" required onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error">{formValidation.errors.confirmPassword}</span>
    </MainForm>
  );
}
