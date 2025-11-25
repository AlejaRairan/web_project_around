import { closeModal } from "./utils.js";  

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector); 
    }

    open() {
        this._popup.classList.add("form-open");
    }
    close() {
        this._popup.classList.remove("form-open");
    }

    _handleEscClose = (event) => {
        console.log(event.key);
        if (event.key === "Escape") {
            this.close();
            closeModal();
        }
    }

    setEventListeners() {
        this._popup.querySelector(".form__close-icon").addEventListener("click", () => {
            this.close();
        });
    document.addEventListener("keydown", this._handleEscClose);
        }
    
}
