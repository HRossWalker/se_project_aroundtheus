class Popup {
  constructor({ popupSelector }) {
    this._modalEl = document.querySelector(popupSelector);
  }

  open() {
    this._modalEl.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEsc);
  }

  close() {
    this._modalEl.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEsc);
  }

  _handleEsc = (e) => {
    if (e.key === "Escape") this.close();
  };

  setEventListeners() {
    this._modalEl.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      }
      if (e.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}

export default Popup;
