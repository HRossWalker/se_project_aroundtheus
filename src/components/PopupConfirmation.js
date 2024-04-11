import { cardDeleteConfirmButton } from "../utils/utils.js";
import Popup from "./Popup.js";

class PopupConfirmation extends Popup {
  constructor(popupSelector, handleDeleteConfirmation) {
    super({ popupSelector });
    this._handleDeleteConfirmation = handleDeleteConfirmation;
  }

  open(card) {
    super.open();
    this._cardId = card._id;
    this._card = card;
  }

  setEventListeners() {
    cardDeleteConfirmButton.addEventListener("click", () => {
      this._handleDeleteConfirmation(this._card, this._cardId);
    });
    super.setEventListeners();
  }
}

export default PopupConfirmation;
