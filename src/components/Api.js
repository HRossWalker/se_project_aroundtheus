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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  //get
  getUserData() {
    //get
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
    });
  }

  updateUserData({ name, about }) {
    //patch
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${name}`, about: `${about}` }),
    });
  }

  updateAvatar(link) {
    //patch
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: link }),
    });
  }

  getCards(id) {
    //get
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "GET",
      headers: {
        authorization: `${this._auth}`,
      },
    });
  }

  createCard({ name, link }) {
    //post
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${name}`, link: `${link}` }),
    });
  }

  deleteCard(id) {
    //delete
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
    });
  }

  likeCard(id) {
    //put
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLiked: true }),
    });
  }

  disLikeCard(id) {
    //delete
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      // .then((res) => {
      //   if (res.ok) {
      //     const isLiked = false;
      //   }
      //   return Promise.reject(`Error: ${res.status}`);
      // })
    });
  }
}

export default Api;

// .then((res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Error: ${res.status}`);
// })
