class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._auth = options.authorization;
    this._id;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${this._auth}`,
      },
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  updateUserData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${name}`, about: `${about}` }),
    }).then(this._checkResponse);
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: link }),
    }).then(this._checkResponse);
  }

  getCards(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "GET",
      headers: {
        authorization: `${this._auth}`,
      },
    }).then(this._checkResponse);
  }

  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${name}`, link: `${link}` }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLiked: true }),
    }).then(this._checkResponse);
  }

  disLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // _request(url, options) {
  //   return fetch(url, options).then(this._checkResponse);
  // }
  //****** Tried this method and it made the each Api getUserData() not operable, and seems to think its not a promise...
}

export default Api;
