import { api } from "../pages/index.js";

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () =>
      this._handleImageClick(this)
    );

    this._likeIcon.addEventListener("click", () => this._handleLikeIcon());

    this._trashIcon.addEventListener("click", () => this._handleDeleteCard());
  }

  _handleLikeIcon() {
    this._likeIcon.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    api.deleteCard(this._id);
    this._cardElement = null;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._cardElement;
  }

  getView() {
    this._el = this._getTemplate();
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._likeIcon = this._cardElement.querySelector(".card__like-button");
    this._trashIcon = this._cardElement.querySelector(".card__trash-button");
    this._setEventListeners();

    return this._el;
  }
}

export default Card;
