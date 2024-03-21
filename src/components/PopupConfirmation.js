import { cardDeleteConfirmButton } from "../utils/utils.js";
import Popup from "./Popup.js";

class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(card, id) {
    super.open();
    cardDeleteConfirmButton.addEventListener("click", () => {
      card.handleDeleteCard(id);
      this.close();
    });
  }
}

export default PopupConfirmation;
