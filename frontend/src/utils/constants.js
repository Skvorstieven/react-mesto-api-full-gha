// Константы

// Плэйсхолдеры для картинок
import placeholderImagePath from '../images/placeholder/Placeholder.svg';
import placeholderUserAvatarPath from '../images/placeholder/Placeholder_user.svg';

// Api
const apiOptions = {
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Плэйсхолдер для карточки
const defaultSelectedCard = {
  link: '#',
  name: '',
};

// Плэйсхолдер для юзера
const defaultCurrenUser = {
  name: 'Placeholder',
  about: 'McDoctorate',
  avatar: placeholderUserAvatarPath,
};

export {
  apiOptions,
  defaultSelectedCard,
  defaultCurrenUser,
  placeholderImagePath,
  placeholderUserAvatarPath,
};
