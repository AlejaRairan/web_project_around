export class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid__card")
      .cloneNode(true);

    return cardTemplate;
  }
  setLikeState(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("grid__icon-active", this._isLiked);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".grid__icon");

    if (this._isLiked) {
      this._likeButton.classList.add("grid__icon-active");
    }

    this._setEventListeners();

    this._element.querySelector(".grid__image").src = this._link;
    this._element.querySelector(".grid__title").textContent = this._name;

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }



  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
       console.log("linea 75 _setEventListeners");
      console.log(this);
      this._handleLikeClick(this);
     
    });

    this._element
      .querySelector(".grid__delete-icon")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    this._element
      .querySelector(".grid__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
