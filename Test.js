class Test {
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
}

const test = new Test({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
    "Content-Type": "application/json",
  },
});

test
  .getInitialCards()
  .then((result) => {
    //   result.array.forEach((element) => {});
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
