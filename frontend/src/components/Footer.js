import React from 'react';

// Модуль футер
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright" lang="en">
        &#169;
        {' '}
        {currentYear}
        {' '}
        Mesto Russia
      </p>
    </footer>
  );
}
