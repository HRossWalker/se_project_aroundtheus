import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = document.querySelector(".modal__picture-view");
    this._popupTitle = document.querySelector(".modal__picture-heading");
  }

  open({ name, link }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
