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
  document.addEventListener("keyup", handleEsc);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEsc);
}

const isEscapeEvent = (e, action) => {
  if (e.key === "Escape") {
    const activePopup = document.querySelector(".modal_opened");
    action(activePopup);
  }
};

function handleEsc(e) {
  isEscapeEvent(e, closePopup);
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (e.target.classList.contains("modal_close")) {
      closePopup(modal);
    }
  });
});

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
  // console.log(profileEditModal.querySelectorAll("modal__input"));
  // resetValidation(profileEditModal.querySelectorAll("modal__input");
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => openPopup(cardAddModal));

function getCardView(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = data.name;
  cardImageElement.setAttribute("src", data.link);

  cardImageElement.setAttribute("alt", data.name);

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  const cardTrash = cardElement.querySelector(".card__trash-button");
  cardTrash.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    cardPictureElement.src = data.link;
    cardPictureElement.alt = data.name;

    cardPictureTitle.textContent = data.name;
    openPopup(cardPictureModal);
  });

  return cardElement;
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  console.log("form submitted");
  const name = e.target.title.value;
  const link = e.target.link.value;
  renderCard({ name, link }, cardListElement);
  closePopup(cardAddModal);
  e.target.reset();

  // resetValidation(addCardForm, e, config);
}

function renderCard(data, container) {
  const cardView = getCardView(data);
  container.prepend(cardView);
}

initialCards.forEach(function (data) {
  renderCard(data, cardListElement);
});
