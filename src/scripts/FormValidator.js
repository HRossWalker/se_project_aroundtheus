class FormValidator {
  constructor(settings, formEl) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
    this._inputList = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
  }

  _setEventListeners() {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._inputEl = inputEl;
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  _showInputError() {
    this._errorMessageEl = this._formEl.querySelector(
      `${this._inputEl.id}-error`
    );
    this._errorMessageEl.textContent = this._inputEl.validationMessage;
    this._inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.classList.add(this._errorClass);
  }

  _checkInputValidity() {
    if (!this._inputEl.validity.valid) {
      return this._showInputError();
    }
    this._hideInputError();
  }

  _hideInputError() {
    this._errorMessageEl = this._formEl.querySelector(
      `${this._inputEl.id}-error`
    );
    console.log(this._inputEl.id);
    // console.log(this._errorMessageEl);
    // console.log(this._inputErrorClass);
    // console.log(this._errorClass);
    this._errorMessageEl.textContent = "";
    this._inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._enableButton(this._inactiveButtonClass);
      return;
    }
    this._disableButton(this._inactiveButtonClass);
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _enableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _disableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      this._inputEl = inputEl;
      this._hideInputError();
    });
  }
}

export default FormValidator;
