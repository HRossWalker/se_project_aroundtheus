// CARD DATA

export const initialCards = [
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

// PROFILE ELEMENTS

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileNameInput = document.querySelector("#modal-name-input");
export const profileJobInput = document.querySelector("#modal-job-input");

// export const profileEditModal = document.querySelector("#profile-edit-modal");
// export const profileTitle = document.querySelector(".profile__title");
// export const profileDescription = document.querySelector(".profile__job");

//CARD ELEMENTS

export const cardAddButton = document.querySelector("#card-add-button");
export const cardListElement = document.querySelector(".cards__list");

// export const cardAddModal = document.querySelector("#card-add-modal");
// export const cardPictureModal = document.querySelector("#card-picture-modal");
// export const cardPictureElement =
//   cardPictureModal.querySelector("#modal-picture");
// export const cardPictureTitle = cardPictureModal.querySelector(
//   ".modal__picture-heading"
// );

// FORMS

// export const addCardForm = document.forms["modal-add-form"];
// export const profileEditForm = document.forms["modal-form"];

// SELECTORS

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_visible",
};
