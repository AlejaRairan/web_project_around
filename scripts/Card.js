
import { PopupwithImage } from "./PopupwithImage.js";  

export class Card {
    constructor({name, link }, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._element.querySelector(".grid__icon").addEventListener("click", function (evt) {
            evt.target.classList.toggle("grid__icon-active");
        });

        this._element.querySelector(".grid__delete-icon").addEventListener("click", function (evt) {
            const card = evt.target.closest(".grid__card");
            if (card) card.remove();
        });

        this._element.querySelector(".grid__image")
    .addEventListener("click", () => {
        this._handleCardClick();
    });
    }
}
 

//metodo que elimine una card