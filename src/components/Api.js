class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
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
    return fetch(`${this._baseUrl}/users/hrosswalker`, {
      method: "GET",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateUserData() {
    //patch
    return fetch(`${this._baseUrl}/users/hrosswalker`, {
      method: "PATCH",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateAvatar() {
    //patch
    return fetch(`${this._baseUrl}/users/hrosswalker/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getCards() {
    //get
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  createCard() {
    //post
    return fetch(`${this._baseUrl}/users/hrosswalker`, {
      method: "POST",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard() {
    //delete
    return fetch(`${this._baseUrl}/users/hrosswalker`, {
      method: "DELETE",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  likeCard() {
    //put
    return fetch(`${this._baseUrl}/users/hrosswalker`, {
      method: "PUT",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  dislikeCard() {
    //delete
    return fetch(`${this._baseUrl}/users/hrosswalker`, {
      method: "DELETE",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {});
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    result.array.forEach((element) => {});
  })
  .catch((err) => {
    console.error(err);
  });
