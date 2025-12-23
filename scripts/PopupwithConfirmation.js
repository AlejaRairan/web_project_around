import { Popup } from "./Popup.js";

export class PopupwithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmButton = this._popup.querySelector(".confirmation__button");
    }
    open() {
        super.open();
    }
    
    close() {
        super.close();
    }
    setEventListeners() {
        super.setEventListeners();

        this._confirmButton.addEventListener("click", () => {
            this.close();    
        });
    }
}
