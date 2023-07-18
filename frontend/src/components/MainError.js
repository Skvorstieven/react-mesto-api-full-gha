// Модуль ошибки основного контента
import React from 'react';
import ErrorContext from '../contexts/ErrorContext';

export default function MainError() {
  const error = React.useContext(ErrorContext);
  return (
    <span className="content__fallback-text">
      Ошибка:
      {error.name}
      {' '}
      {error.message}
    </span>
  );
}
