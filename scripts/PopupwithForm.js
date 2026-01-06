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
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

   } 