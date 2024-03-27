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

//VAR

let cardSection;
let initialUserData;

//API

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authorization: "7dcd9a93-149c-4e56-87db-9285c9177a9e",
});

api
  .getUserData()
  .then((data) => {
    initialUserData = new UserInfo(data);
  })
  .catch((err) => console.error(`${err} Profile info may be incorrect`));

api
  .getInitialCards()
  .then((data) => {
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
  })
  .catch((err) => console.error(`${err} Cards may be missing`));

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    "#card-template",
    () => {
      imgPopup.open(cardItem);
    },
    () => {
      deleteConfirmPopup.open(card);
    },

    (likeStatus, id) => {
      if (!likeStatus) {
        api
          .likeCard(id)
          .then(() => card._handleLikeIcon())
          .catch((err) => console.error(`${err}, Failed to like card`));
      } else {
        api
          .disLikeCard(id)
          .then(() => card._handleLikeIcon())
          .catch((err) => console.error(`${err}, Failed to dislike card`));
      }
    }
  );
  return card.getView();
};

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
  api
    .deleteCard(id)
    .then(() => card.handleDeleteCard(id))
    .catch((err) => console.error(`${err}, Failed to delete card`));
}

function handleProfileUpdate(userData) {
  profilePopup.setLoading(true);
  api
    .updateUserData(userData)
    .then(() => {
      initialUserData.setUserInfo(userData);
      profilePopup.close();
    })
    .catch((err) => console.error(`${err}, Failed to update Avatar`))
    .finally(() => profilePopup.setLoading(false));
}

function handleAddCard(cardData) {
  newCardPopup.setLoading(true);
  api
    .createCard(cardData)
    .then((data) => {
      const cardFormElement = createCard(data);
      cardSection.addItem(cardFormElement);
      newCardPopup.close();
    })
    .catch((err) => console.error(`${err}, Failed to add Card`))
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
  api
    .getUserData()
    .then((data) => {
      profileNameInput.value = data.name;
      profileAboutInput.value = data.about;
      profilePopup.open();
    })
    .catch((err) => console.error(`${err} Profile data may be incorrect`));
});

cardAddButton.addEventListener("click", () => {
  formValidators["addCardForm"].resetValidation();
  newCardPopup.open();
});

avatarUpdateButton.addEventListener("click", () => {
  formValidators["avatarUpdate"].resetValidation();
  avatarPopup.open();
});