// Модуль запросов к API
import { apiOptions } from './constants';

class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
    this._formLoadingTemplateSelector = options.formLoadingTemplateSelector;
  }

  _checkResponse(res) { // Проверить ответ на запрос
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getCards() { // Получить карточки с сервера
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._checkResponse(res));
  }

  getUserInfo() { // Получить данные пользователя с сервера
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._checkResponse(res));
  }

  changeUserInfo(newUserInfo) { // Изменить данные пользователя на сервере
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => this._checkResponse(res));
  }

  changeUserAvatar(newAvatarSrc) { // Изменить аватар пользователя на сервере
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(newAvatarSrc),
    })
      .then((res) => this._checkResponse(res));
  }

  addNewCard(data) { // Добавить новую карточку на сервер
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) { // Удалить карточку на сервере
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._checkResponse(res));
  }

  changeCardLikeState(cardId, isLiked) { // Изменить состояние лайка карточки на сервере
    if (isLiked) {
      return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
        .then((res) => this._checkResponse(res));
    }
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._checkResponse(res));
  }
}
const api = new Api(apiOptions);
export default api;
