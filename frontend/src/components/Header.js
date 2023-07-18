// Модуль хеадер
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import logoPath from '../images/logo/logo_white.svg';

export default function Header(props) {
  const { userEmail, onSignOut } = props;

  // Создание стэйтов
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [settingsButtonState, setSettingsButtonState] = React.useState(true);

  // Создание слушателя изменения размера окна
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  // Обработчик клика по бургер меню
  function handleSettingsButtonClick() {
    setSettingsButtonState(!settingsButtonState);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
          windowWidth < 580 && (
            <div className={settingsButtonState ? 'header__user-email-container header__user-email-container_hidden' : 'header__user-email-container appear-animation'}>
              <p className="header__user-email">{userEmail}</p>
              <button type="button" className="header__link button_type_log-out" onClick={onSignOut}>Выйти</button>
            </div>
          )
        }
        />
        <Route path="/*" element="" />
      </Routes>

      <header className="header">

        <img src={logoPath} alt="Место Россия" className="header__logo" />

        <Routes>

          <Route
            path="/"
            element={
              windowWidth > 580
                ? (
                  <div className="header__user-email-container">
                    <p className="header__user-email">{userEmail}</p>
                    <button type="button" className="header__link button_type_log-out" onClick={onSignOut}>Выйти</button>
                  </div>
                )
                : (<button aria-label="Развернуть" type="button" className={settingsButtonState ? 'button_type_settings-open' : 'button_type_settings-close'} onClick={handleSettingsButtonClick} />)
            }
          />

          <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />

          <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />

          <Route path="/*" element={<Link to="/" className="header__link">Домой</Link>} />

        </Routes>

      </header>
    </>
  );
}
