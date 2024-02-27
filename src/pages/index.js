import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImages from "../scripts/PopupWithImages.js";
import UserInfo from "../scripts/UserInfo.js";
import "../pages/index.css";
import {
  initialCards,
  cardAddButton,
  profileEditButton,
  profileNameInput,
  profileJobInput,
  cardListElement,
  config,
  // profileEditModal,
  // profileTitle,
  // profileDescription,
  // profileTitleInput,
  // profileDecriptionInput,
  // cardAddModal,
  // cardPictureModal,
  // cardPictureTitle,
  // cardPictureElement,
  // addCardForm,
  // profileEditForm,
} from "../utils/constants.js";
import Section from "../scripts/Section.js";

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const createCard = (cardItem) => {
  const card = new Card(cardItem, "#card-template", () => {
    imgPopup.open(cardItem);
  });
  return card.getView();
};

const imgPopup = new PopupWithImages("#card-picture-modal");
imgPopup.setEventListeners();

const cardSection = new Section(
  {
    data: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  cardListElement
);
cardSection.renderItems();

const newCardPopup = new PopupWithForm(".picture-modal", (formData) => {
  const cardFormElement = createCard(formData);
  cardSection.addItem(cardFormElement);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

const userInfo = new UserInfo(".profile__name", ".profile__job");

const profilePopup = new PopupWithForm(".profile-modal", (data) => {
  profilePopup.close();
  userInfo.setUserInfo(data);
});
profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  formValidators["profileForm"].resetValidation();
  const data = userInfo.getUserInfo();
  profileNameInput.value = data.name;
  profileJobInput.value = data.job;
  profilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  formValidators["addCardForm"].resetValidation();
  newCardPopup.open();
});

// function renderCard(data, container) {
//   const cardElement = createCard(data);
//   container.prepend(cardElement);
// }

// function openPopup(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keyup", handleEsc);
// }

// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keyup", handleEsc);
// }

// const isEscapeEvent = (e, action) => {
//   if (e.key === "Escape") {
//     const activePopup = document.querySelector(".modal_opened");
//     action(activePopup);
//   }
// };

// function handleEsc(e) {
//   isEscapeEvent(e, closePopup);
// }

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addCardForm.addEventListener("submit", handleProfileAddSubmit);

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   console.log("form submitted");
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDecriptionInput.value;
//   closePopup(profileEditModal);
//   formValidators[profileEditForm.getAttribute("name")].resetValidation();
// }

// function handleProfileAddSubmit(e) {
//   e.preventDefault();
//   console.log("form submitted");
//   const name = e.target.title.value;
//   const link = e.target.link.value;
//   renderCard({ name, link }, cardListElement);
//   closePopup(cardAddModal);
//   e.target.reset();
//   formValidators[addCardForm.getAttribute("name")].resetValidation();
// }

// function handleImageClick() {
//   // cardPictureElement.src = data.link;
//   // cardPictureElement.alt = data.name;
//   // cardPictureTitle.textContent = data.name;

// }

// const modals = document.querySelectorAll(".modal");
// modals.forEach((modal) => {
//   modal.addEventListener("mousedown", (e) => {
//     if (e.target.classList.contains("modal_opened")) {
//       closePopup(modal);
//     }
//     if (e.target.classList.contains("modal__close")) {
//       closePopup(modal);
//     }
//   });
// });
