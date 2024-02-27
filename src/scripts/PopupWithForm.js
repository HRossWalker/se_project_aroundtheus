import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupElement = document.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._list = [...this._popupElement.querySelectorAll(".modal__input")];
  }

  close() {
    this._popupElement.reset();
    super.close();
  }

  getForm() {
    const inputData = {};
    this._list.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", () => {
      this._handleFormSubmit(this.getForm());
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
