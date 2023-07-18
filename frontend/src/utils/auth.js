import { apiOptions } from './constants';

class Authorization {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  // Проверить ответ на запрос
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // Зарегистрировать пользователя
  register(email, password) {
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => this._checkResponse(res));
  }

  // Авторизировать пользователя
  authorize(email, password) {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => this._checkResponse(res));
  }

  // Выход из аккаунта
  logout() {
    return fetch(`${this._baseURL}/signout`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._checkResponse(res));
  }

  // Проверить токен
  checkToken() {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      credentials: 'include',
    });
  }
}

const auth = new Authorization(apiOptions);
export default auth;
