import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._modalEl.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._list = [...this._popupForm.querySelectorAll(".modal__input")];
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputData = {};
    this._list.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
