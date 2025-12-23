import { PopupwithImage } from "./PopupwithImage.js";

export class Card {
  constructor(
    { name, link },
    cardSelector,
    handleCardClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }
  //clone template
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid__card")
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
  removeCard() {
    //this._element.remove();
    //this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".grid__icon")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("grid__icon-active");
      });
    //metodo boton de la basura

    this._element
      .querySelector(".grid__delete-icon")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    //metodo que borra la card al confirmar

    document
      .querySelector(".confirmation__button")
      .addEventListener("click", (evt) => {
        this._element.remove();
      });

    this._element
      .querySelector(".grid__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
