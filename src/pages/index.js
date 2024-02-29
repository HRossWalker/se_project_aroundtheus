import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImages.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  initialCards,
  cardAddButton,
  profileEditButton,
  profileNameInput,
  profileJobInput,
  cardListElement,
  config,
} from "../utils/utils.js";
import Section from "../components/Section.js";

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

const userInfo = new UserInfo(".profile__name", ".profile__job");

const profilePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  profilePopup.close();
  userInfo.setUserInfo(data);
});
profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#card-add-modal", (data) => {
  const cardFormElement = createCard(data);
  cardFormElement.querySelector(".card__title").textContent = data.title;
  cardFormElement.querySelector(
    ".card__image"
  ).alt = `Picture of ${data.title}`;
  cardSection.addItem(cardFormElement);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

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
