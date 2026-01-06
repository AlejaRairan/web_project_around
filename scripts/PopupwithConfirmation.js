import { Popup } from "./Popup.js";

export class PopupwithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".confirmation__button");
  }

  setEventListeners() {
    super.setEventListeners();
  }

  setSubmitAction(action) {
    this._confirmButton.onclick = () => {
      action();
      this.close();
    };
  }
}