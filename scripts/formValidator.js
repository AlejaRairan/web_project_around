export class FormValidator {
    constructor(formElement) {
        this.formElement = formElement;

    }
    //funcion que muestra el error
    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.add("form__input_type_error");
        errorElement.textContent = errorMessage;
        errorElement.classList.add("form__input-error_active");
    }
    //quita el texto de error
    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.remove("form__input_type_error");
        errorElement.classList.remove("form__input-error_active");
        errorElement.textContent = "";

    }
    //verifica la validez de los inputs

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }

    }

    //verifica si hay algun input invalido
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    //activa o desactiva el boton de submit

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add("form__button_inactive");
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove("form__button_inactive");
            buttonElement.disabled = false;
        }
    }

    //configura los event listeners
    _setEventListeners() {
        const inputList = Array.from(this.formElement.querySelectorAll(".form__input"));
        const buttonElement = this.formElement.querySelector(".form__submit");
        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });

    }
    //funcion que inicia la validacion
    _enableValidation() {
        this._setEventListeners();
    }
};
