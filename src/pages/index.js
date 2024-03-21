import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";
import {
  cardAddButton,
  avatarUpdateButton,
  profileEditButton,
  profileNameInput,
  profileAboutInput,
  cardListElement,
  config,
  avatarProfileImage,
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

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    "#card-template",
    () => {
      imgPopup.open(cardItem);
    },
    (cardId) => {
      deleteConfirmPopup.open(card, cardId);
    }
  );
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
let currentAvatar;

api
  .getUserData()
  .then((results) => results.json())
  .then((data) => {
    data;
    currentAvatar = data.avatar;
    initialUserData = new UserInfo(data);
  });

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileUpdate
);
profilePopup.setEventListeners();

function handleProfileUpdate(userData) {
  initialUserData.setUserInfo(userData);
  profilePopup.setLoading(true);
  api
    .updateUserData(userData)
    .then(() => profilePopup.close())
    .catch((err) => console.error(`${err}, Failed to update Avatar`))
    .finally(() => profilePopup.setLoading(false));
}

const newCardPopup = new PopupWithForm("#card-add-modal", handleAddCard);
newCardPopup.setEventListeners();

function handleAddCard(cardData) {
  const cardFormElement = createCard(cardData);
  cardSection.addItem(cardFormElement);
  newCardPopup.setLoading(true);
  api
    .createCard(cardData)
    .then(() => newCardPopup.close())
    .catch((err) => console.error(`${err}, Failed to update Avatar`))
    .finally(() => newCardPopup.setLoading(false));
}

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

//********

export const deleteConfirmPopup = new PopupConfirmation("#modal-delete");
deleteConfirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#modal-avatar", handleUpdateAvatar);
avatarPopup.setEventListeners();

function handleUpdateAvatar(input) {
  avatarPopup.setLoading(true);
  api
    .updateAvatar(input.link)
    .then((result) => {
      console.log(result.avatar);
      avatarProfileImage.setAvatar(result.avatar);
      avatarPopup.close();
    })
    .catch((err) => console.error(`${err}, Failed to update Avatar`))
    .finally(() => avatarPopup.setLoading(false));
}

avatarUpdateButton.addEventListener("click", () => {
  formValidators["avatarUpdate"].resetValidation();
  avatarPopup.open();
});
