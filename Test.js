const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

class Test {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._auth = options.authorization;
  }

  /**
   *
   * @returns
   */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
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
      .then((data) => console.log(data));
  }

  setInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: "Yosemite Valley",
        // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
        initialCards,
      }),
    });

    //.then((res) => {
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   return Promise.reject(`Error: ${res.status}`);
    // })
  }
  getUserData() {
    //get
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `${this._auth}`,
      },
    });
  }

  updateUserData({ name, job }) {
    //patch
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${name}`, job: `${job}` }),
    });
  }
  createCard(id) {
    //post
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "POST",
      headers: {
        authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: "Yosemite Valley",
        // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
        initialCards,
      }),
    });
  }
}

const test = new Test({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
});

//   result.array.forEach((element) => {});

test
  .getUserData()
  .then((results) => results.json())
  .then((data) => console.log(data));

// test
//   .getInitialCards()
//   .then((result) => {
//     //   result.array.forEach((element) => {});
//     console.log(result);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// function getPosts(url, sucCallback, errCallback) {
//   fetch(url)
//     .then((response) => {
//       console.log(response);

//       if (response.ok) {
//         return response.json();
//       } else {
//         throw Error("Bad Request");
//       }
//     })
//     .then((posts) => {
//       const postId = posts[0].id;

//       fetch(`${url}/${postId}`)
//         .then((response) => response.json())
//         .then((post) => sucCallback(post));
//     })
//     .catch((err) => errCallback(err));
// }

// getPosts(
//   "https://jsonplaceholder.typicode.com/post",
//   (post) => console.log(post),
//   (err) => console.error(err)
// );

//SERGE

// const Url = "https://jsonplaceholder.typicode.com/albums/1/photos";
// const Url2 = "https://jsonplaceholder.typicode.com/posts/1/comments";

// const apiFetchCards = () => {
//   fetch(Url)
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };

// const apiFetchCards = async () => {
//   const cards = await fetch(Url)
//     .then((response) => response.json())
//     .then((data) => data)
//     .catch((err) => console.error(err));

//     const goods = await fetch(Url)
//     .then((response) => response.json())
//     .then((data) => data)
//     .catch((err) => console.error(err));

//     Promise.all()

//   cards.forEach((card) => {
//     createCard(card);
//   });
// };

// apiFetchCards();

// Promise.all([fetch(Url), fetch(Url2)]).then(
//   values
//     .forEach((value) => console.log(value.json()))
//     .catch((err) => console.error(err))
// );
