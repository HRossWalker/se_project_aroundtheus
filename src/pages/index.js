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

api.getServerData().then(([data, cards]) => {
  initialUserData = new UserInfo(
    "#profile-name",
    "#profile-about",
    "#profile-avatar"
  );
  initialUserData.setUserInfo(data);

  cardSection = new Section(
    {
      data: cards,
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
    },

    (likeStatus, id) => {
      if (!likeStatus) {
        api
          .likeCard(id)
          .then(() => card.handleLikeIcon())
          .catch((err) => console.error(`${err}, Failed to like card`));
      } else {
        api
          .disLikeCard(id)
          .then(() => card.handleLikeIcon())
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

// function handleSubmit(request, popupInstance, loadingText = "Saving...") {
//   popupInstance.renderLoading(true, loadingText);
//   request()
//     .then(() => {
//       popupInstance.close();
//     })
//     .catch(console.error)
//     .finally(() => {
//       popupInstance.renderLoading(false);
//     });
// }

// function handleProfileFormSubmit(inputValues) {
//         we create a function that returns a promise
//   function makeRequest() {
//        `return` lets us use a promise chain `then, catch, finally` inside `handleSubmit`
//     return api.editProfile(inputValues).then((userData) => {
//       userInfo.setUserInfo(userData)
//     });
//   }
//         Here we call the function passing the request, popup instance and if we need some other loading text we can pass it as the 3rd argument
//   handleSubmit(makeRequest, profilePopup);
// }

function handleDeleteConfirmation(card, id) {
  api
    .deleteCard(id)
    .then(() => {
      card.handleDeleteCard();
      deleteConfirmPopup.close();
    })
    .catch((err) => console.error(`${err}, Failed to delete card`));
}

function handleProfileUpdate(userData) {
  profilePopup.renderLoading(true);
  api
    .updateUserData(userData)
    .then(() => {
      initialUserData.setUserInfo(userData);
      profilePopup.close();
    })
    .catch((err) => console.error(`${err}, Failed to update Profile Info`))
    .finally(() => {
      profilePopup.renderLoading(false);
    });
}

function handleAddCard(cardData) {
  newCardPopup.renderLoading(true);
  api
    .createCard(cardData)
    .then((data) => {
      const cardFormElement = createCard(data);
      cardSection.addItem(cardFormElement);
      newCardPopup.close();
    })
    .catch((err) => console.error(`${err}, Failed to add Card`))
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
}

function handleUpdateAvatar(input) {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(input.link)
    .then(() => {
      initialUserData.setUserAvatar(input.link);
      avatarPopup.close();
    })
    .catch((err) => console.error(`${err}, Failed to update Avatar`))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}

//EVENT LISTENER

profileEditButton.addEventListener("click", () => {
  formValidators["profileForm"].resetValidation();
  const data = initialUserData.getUserInfo();
  profileNameInput.value = data.name;
  profileAboutInput.value = data.about;
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
