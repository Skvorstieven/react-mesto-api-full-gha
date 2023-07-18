import React from 'react';

// Модуль загрузки основного контента
import AnimatedEllipsis from './AnimatedEllipsis';

export default function MainLoading() {
  return (<span className="content__fallback-text"><AnimatedEllipsis text="Загрузка" /></span>);
}
