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
const profileAddButton = document.querySelector("#profile-add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddCloseButton = profileAddModal.querySelector(".modal__close");
const profileAddTitle = document.querySelector(".profile__title");
const profileAddImgLink = document.querySelector(".profile__img-link");
const profileAddTitleInput = document.querySelector("#profile-title-input");
const profileAddImgLinkInput = document.querySelector("#modal-img-link-input");
const cardListElement = document.querySelector(".cards__list");

const profilePictureModal = document.querySelector("#profile-picture-modal");
const cardPictureElement = profilePictureModal.querySelector("#modal-picture");
const cardPictureAlt = profilePictureModal.querySelector("#modal-picture");
const cardPictureTitle = profilePictureModal.querySelector(
  ".modal__picture-heading"
);
const profilePictureCloseButton =
  profilePictureModal.querySelector(".modal__close");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const profileAddCardForm = document.forms["modal-add-form"];
const profileEditForm = document.forms["modal-form"];

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddCardForm.addEventListener("submit", handleProfileAddSubmit);

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

profileAddButton.addEventListener("click", () => openPopup(profileAddModal));

profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileAddCloseButton.addEventListener("click", () =>
  closePopup(profileAddModal)
);

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
  const cardBasura = cardElement.querySelector(".card__basura-button");
  cardBasura.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    cardPictureElement.src = data.link;
    cardPictureAlt.alt = data.name;
    // cardPictureTitle = data.name;
    cardPictureTitle.textContent = data.name;
    openPopup(profilePictureModal);
  });

  profilePictureCloseButton.addEventListener("click", () => {
    closePopup(profilePictureModal);
  });

  //image
  // open popup
  // find image element inside popup
  // replace src with card link
  // replace alt with card title

  return cardElement;
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  console.log("form submitted");
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({ name, link });
  renderCard(cardView, cardListElement);
  closePopup(profileAddModal);
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

initialCards.forEach(function (data) {
  const cardView = getCardView(data);
  renderCard(cardView, cardListElement);
});
