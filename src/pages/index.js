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

//API

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
});

api
  .getUserData()
  .then((results) => results.json())
  .then((data) => {
    data;
    currentAvatar = data.avatar;
    initialUserData = new UserInfo(data);
  });

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
    () => {
      deleteConfirmPopup.open(card);
    }
  );
  return card.getView();
};

//VAR

let cardSection;
let initialUserData;
let currentAvatar;
let profileData;
let newCardData;

//Popups

const imgPopup = new PopupWithImages("#card-picture-modal");
imgPopup.setEventListeners();

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileUpdate
);
profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#card-add-modal", handleAddCard);
newCardPopup.setEventListeners();

export const deleteConfirmPopup = new PopupConfirmation(
  "#modal-delete",
  handleDeleteConfirmation
);
deleteConfirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#modal-avatar", handleUpdateAvatar);
avatarPopup.setEventListeners();

//HANDLES

function handleDeleteConfirmation(card, id) {
  card.handleDeleteCard(id);
}

function handleProfileUpdate(userData) {
  initialUserData.setUserInfo(userData);
  profilePopup.setLoading(true);
  api
    .updateUserData(userData)
    .then(() => profilePopup.close())
    .catch((err) => console.error(`${err}, Failed to update Avatar`))
    .finally(() => profilePopup.setLoading(false));
}

function handleAddCard(cardData) {
  newCardPopup.setLoading(true);
  api
    .createCard(cardData)
    .then((result) => {
      if (result.ok) return result.json();
    })
    .then((data) => {
      // console.log(`**handleAddCard**${data}`);
      const cardFormElement = createCard(data);
      cardSection.addItem(cardFormElement);

      // ************************************************************************** need to pull id from server now or before like and delete

      newCardPopup.close();
    })
    .catch((err) => console.error(`${err}, Failed to update Avatar`))
    .finally(() => newCardPopup.setLoading(false));
}

function handleUpdateAvatar(input) {
  avatarPopup.setLoading(true);
  api
    .updateAvatar(input.link)
    .then(() => {
      avatarProfileImage.src = input.link;
      avatarPopup.close();
    })
    .catch((err) => console.error(`${err}, Failed to update Avatar`))
    .finally(() => avatarPopup.setLoading(false));
}

//EVENT LISTENER

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

avatarUpdateButton.addEventListener("click", () => {
  formValidators["avatarUpdate"].resetValidation();
  avatarPopup.open();
});
