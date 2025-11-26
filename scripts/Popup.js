import { Card } from "./Card.js";  

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector); 
    }

    open() {
        this._popup.classList.add("form-open");
        document.addEventListener("keydown", this._handleEscClose);

    }
    close() {
        this._popup.classList.remove("form-open");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
    
        }
    }

      setEventListeners() {
        const closeIcon = this._popup.querySelector(".form__close-icon");
        if (closeIcon) {
            closeIcon.addEventListener("click", () => this.close());
        }
        const overlay = this._popup.querySelector(".modal__overlay");
        this._popup.addEventListener("click", (evt) => {
            if (evt.target === overlay) {
                this.close();
            }
        }); 
    }


}
