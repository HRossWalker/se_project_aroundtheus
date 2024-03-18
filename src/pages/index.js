import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";
import {
  cardAddButton,
  profileEditButton,
  profileNameInput,
  profileAboutInput,
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

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
});

let cardSection;

api.getInitialCards().then((data) => {
  data;
  cardSection = new Section(
    {
      data: data,
      renderer: (data) => {
        const cardElement = createCard(data);
        cardSection.addItem(cardElement);
      },
    },
    cardListElement
  );
  cardSection.renderItems();
});

// api
//   .createCard()
//   .then((result) => {
//     result.array.forEach((element) => {});
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// api.deleteCard(0);

const createCard = (cardItem) => {
  const card = new Card(cardItem, "#card-template", () => {
    console.log(cardItem);
    imgPopup.open(cardItem);
    // api.createCard(cardItem);
  });
  return card.getView();
};

// const oneCard = {
//   name: "Lago di Braies",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
// };

// api.createCard(oneCard).then(console.log(oneCard));

const imgPopup = new PopupWithImages("#card-picture-modal");
imgPopup.setEventListeners();

let initialUserData;

api
  .getUserData()
  .then((results) => results.json())
  .then((data) => {
    data;
    initialUserData = new UserInfo(data);
  });

const profilePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  profilePopup.close();
  initialUserData.setUserInfo(data);
  api.updateUserData(data);
});
profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#card-add-modal", (data) => {
  console.log(data);
  const cardFormElement = createCard(data);
  cardSection.addItem(cardFormElement);
  api.createCard(data);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

let profileData;

profileEditButton.addEventListener("click", () => {
  formValidators["profileForm"].resetValidation();
  profileData = initialUserData
    .getUserInfo()
    .then((results) => results.json())
    .then((data) => {
      data;

      profileNameInput.value = data.name;
      profileAboutInput.value = data.about;
    });
  profilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  formValidators["addCardForm"].resetValidation();
  newCardPopup.open();
});
