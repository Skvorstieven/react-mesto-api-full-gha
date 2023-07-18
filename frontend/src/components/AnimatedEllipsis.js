/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

// Модуль анимированного троеточия при загрузке
export default function AnimatedEllipsis(props) {
  const { text } = props;
  return (
    <>
      {text}<span className="blink-animation">.</span><span className="blink-animation">.</span><span className="blink-animation">.</span>
    </>
  );
}
