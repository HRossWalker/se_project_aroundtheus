import { api } from "../pages/index.js";
import { deleteConfirmPopup } from "../pages/index.js";

class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeDislikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likeStatus = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeDisLike = handleLikeDislikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () =>
      this._handleImageClick(this)
    );

    this._likeIcon.addEventListener("click", () => this._handleLikeIcon());

    this._trashIcon.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
      // this._handleDeleteCard();
    });
  }

  _handleLikeIcon() {
    this._likeIcon.classList.toggle("card__like-button_active");
    if (!this._likeStatus) {
      api.likeCard(this._id);
    }
    api.disLikeCard(this._id);
  }

  _handleDeleteConfirm(id) {
    deleteConfirmPopup.open(id);
  }

  handleDeleteCard(cardId) {
    this._cardElement.remove();
    api.deleteCard(cardId);
    // this._cardElement = null;
  }

  // _handleDeleteCard() {
  //   // we can do any actions here
  //   this._handleDeleteClick(this._id);
  // }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._likeIcon = this._cardElement.querySelector(".card__like-button");
    if (this._likeStatus)
      this._likeIcon.classList.add("card__like-button_active");
    this._trashIcon = this._cardElement.querySelector(".card__trash-button");
    this._deleteModal = document.querySelector("modal__delete-modal_active");

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
