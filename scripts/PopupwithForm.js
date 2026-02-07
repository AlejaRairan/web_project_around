import { Popup } from "./Popup.js";

export class PopupwithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    
    _getInputValues() {
     const inputList = Array.from(this._popup.querySelectorAll(".form__input"));
       const formValues = {};
        inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        console.log(formValues);
       return formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            console.log(this._getInputValues());
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

   } 

   /*const addCard = ({ name, link }) => {
   
     //api para crear tarjeta
     api
       .createCard(name, link)
       .then((cardData) => {
         const card = new Card(
           {
             name: cardData.name,
             link: cardData.link,
             _id: cardData._id,
             isLiked: cardData.likes,
           },
           "#gridTemplate",
           () => imagePopup.open({ link: cardData.link, name: cardData.name }),
           handleDeleteClick,
           handleLikeClick
         );
   
         document.querySelector(".grid").prepend(card.generateCard());
       })
       .catch(console.error);
   };*/