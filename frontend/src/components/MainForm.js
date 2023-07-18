import React from 'react';

export default function MainForm(props) {
  const {
    name,
    title,
    buttonText,
    isValid,
    onSubmit,
    children,
  } = props;
  return (
    <div className="content__form-container appear-animation">
      <p className="content__form-title">{title}</p>
      <form className="form" name={name} noValidate onSubmit={onSubmit}>
        {children}
        <button aria-label="Войти в аккаунт" type="submit" className={isValid ? 'button button_type_submit button_place_authorization-submit' : 'button button_type_submit button_place_authorization-submit button_disabled'} disabled={!isValid} name="popupSubmit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
