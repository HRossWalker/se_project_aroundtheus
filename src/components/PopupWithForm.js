import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._modalEl.querySelector(".modal__form");
    this._submitButton = this._modalEl.querySelector(".modal__save-button");
    this._handleFormSubmit = handleFormSubmit;
    this._list = [...this._popupForm.querySelectorAll(".modal__input")];
    this._submitButtonText = this._submitButton.textContent;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  // setInputValues(data) {
  //   this._inputList.forEach((input) => {
  //        here you insert the `value` by the `name` of the input
  //     input.value = data[input.name];
  //   });
  // }

  _getInputValues() {
    const inputData = {};
    this._list.forEach((input) => {
      inputData[input.name] = input.value;
    });

    return inputData;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
