import { Popup } from "./Popup.js";
export class PopupwithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popup.querySelector(".modal__img");
        this._captionElement = this._popup.querySelector(".modal__caption");
    }
    open({ link, name }) {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._captionElement.textContent = name;
        super.open();
    }
    setEventListeners() {
        super.setEventListeners();
    }
}