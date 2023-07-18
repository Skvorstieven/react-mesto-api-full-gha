import React from 'react';
import useFormWithValidation from '../utils/useFormWithValidation';
import MainForm from './MainForm';

export default function Login(props) {
  const { onLogin } = props;

  // Запуск валидации формы
  const formValidation = useFormWithValidation(false);

  // Создание стэйта
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  // Обработчик изменения инпутов
  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    formValidation.handleChange(e);
  }

  // Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValue.email, formValue.password);
    setFormValue({ email: '', password: '' });
  }

  return (
    <MainForm name="login" title="Вход" buttonText="Войти" isValid={formValidation.isValid} onSubmit={handleSubmit}>
      <input className="form__input form__input_place_login" type="email" name="email" autoComplete="email" value={formValue.email} placeholder="Email" required onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error">{formValidation.errors.username}</span>
      <input className="form__input form__input_place_login" type="password" name="password" autoComplete="current-password" value={formValue.password} minLength="2" maxLength="30" placeholder="Пароль" required onChange={handleChange} onBlur={handleChange} />
      <span className="form__input-error">{formValidation.errors.password}</span>
    </MainForm>
  );
}
