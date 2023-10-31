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

// const profileEditOpen = document.querySelector("#profile-add-modal");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#modal-title-input");
const profileDecriptionInput = document.querySelector(
  "#modal-description-input"
);
const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddCloseButton = cardAddModal.querySelector(".modal__close");
// const cardAddTitle = document.querySelector(".profile__title");
// const cardAddImgLink = document.querySelector(".profile__img-link");
const cardAddTitleInput = document.querySelector("#card-title-input");
const cardAddImgLinkInput = document.querySelector("#modal-img-link-input");
const cardListElement = document.querySelector(".cards__list");

const cardPictureModal = document.querySelector("#card-picture-modal");
const cardPictureElement = cardPictureModal.querySelector("#modal-picture");
const cardPictureTitle = cardPictureModal.querySelector(
  ".modal__picture-heading"
);
const cardPictureCloseButton = cardPictureModal.querySelector(".modal__close");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addCardForm = document.forms["modal-add-form"];
const profileEditForm = document.forms["modal-form"];

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleProfileAddSubmit);

function handleProfileEditSubmit(e) {
  e.preventDefault();
  console.log("form submitted");
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDecriptionInput.value;
  closePopup(profileEditModal);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDecriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => openPopup(cardAddModal));

// profileEditCloseButton.addEventListener("click", () =>
//   closePopup(profileEditModal)
// );

// cardAddCloseButton.addEventListener("click", () => closePopup(cardAddModal));

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});

function getCardView(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = data.name;
  cardImageElement.setAttribute("src", data.link);
  // cardImageElement.src = data.link;
  cardImageElement.setAttribute("alt", data.name);
  // cardImageElement.alt = data.name;
  // cardListElement.prepend(cardElement);

  // add event listner for like,
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
    // cardLikeButton.classList.toggle(".card__like-button");
  });

  //listener delete,
  const cardTrash = cardElement.querySelector(".card__trash-button");
  cardTrash.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    cardPictureElement.src = data.link;
    cardPictureElement.alt = data.name;
    // cardPictureTitle = data.name;
    cardPictureTitle.textContent = data.name;
    openPopup(cardPictureModal);
  });

  // cardPictureCloseButton.addEventListener("click", () => {
  //   closePopup(cardPictureModal);
  // });

  return cardElement;
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  console.log("form submitted");
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({ name, link });
  renderCard(cardView, cardListElement);
  // renderCard(e, cardListElement);
  closePopup(cardAddModal);
  e.target.reset();
}

// function renderCard(data, container) {
//   const cardView = getCardView(data);
//   container.prepend(cardView);
// }

//    Tried to implement your recommendation for the universal function but couldn't get it to work.

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

initialCards.forEach(function (data) {
  const cardView = getCardView(data);
  renderCard(cardView, cardListElement);
  //renderCard(data, cardListElement);
});
