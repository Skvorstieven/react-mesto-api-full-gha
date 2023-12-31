# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.

## Эндпоинты API

/signup - POST Зарегистрирует нового пользователя;

/signin - POST Авторизует пользователя и присылает cookie;

/signout - POST Выходит из аккаунта и очищает cookie;

/users - GET вернет список зарегистрированных пользователей

/users/me - GET вернет данные о текущем пользователе, PATCH обновит данные о текущем пользователе;

/users/:userId - GET вернет данные пользователя с "userId";

/cards - GET вернет все существующие карточки, POST сохранит новую карточку;

/cards/:cardId - DELETE удалит карточку если она создана текущим пользователем;

/cards/:cardId/likes - PUT добавит лайк на карточку, DELETE уберет его;

## Скрипты Бэкенда

npm run start - Запустит сервер;

npm run dev - Запустит сервер в режиме разработки с hot reload;

## Скрипты Фронтенда

npm run start - Запустит приложение с hot reload;

npm run build - Создаст текущую сборку приложения;
