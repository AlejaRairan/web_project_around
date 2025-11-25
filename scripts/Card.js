
import { PopupwithImage } from "./PopupwithImage.js";  

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }
    //clone template
    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.grid__card')
            .cloneNode(true);

        return cardTemplate;
    }

    //metodo que crea la card

    generateCard() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector(".grid__image").src = this._link;
        this._element.querySelector(".grid__title").textContent = this._name;

        return this._element;
    }

  
    _setEventListeners() {
        const imagepopup = new PopupwithImage("#modalContainer");
        imagepopup.setEventListeners();
        this._element.querySelector(".grid__icon").addEventListener("click", function (evt) {
            evt.target.classList.toggle("grid__icon-active");
        });

        this._element.querySelector(".grid__delete-icon").addEventListener("click", function (evt) {
            const card = evt.target.closest(".grid__card");
            if (card) card.remove();
        });

        this._element.querySelector(".grid__image").addEventListener("click", () => {
            //abrir modal
      imagepopup.open({ link: this._link, name: this._name });

        });
    }
}


//metodo que elimine una card