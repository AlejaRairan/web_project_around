//import { enableValidationvalid } from "./validate"; //
const icon = document.querySelector("#openForm");
const form = document.querySelector("#form");
const close = document.querySelector("#closeForm");
const save = document.querySelector("#saveForm");
const headerSubtitle = document.querySelector("#nameInput");
const headerDescription = document.querySelector("#aboutInput");
const nameForm = document.querySelector("#name");
const aboutForm = document.querySelector("#about");
const iLike = document.querySelector("#corazon");
const add = document.querySelector("#addButton");
const secondForm = document.querySelector("#formAdd");
const closeForm = document.querySelector("#closeSecondForm");
const saveSecondForm = document.querySelector("#saveSecondForm");
const nameSecondForm = document.querySelector("#title");
const linkSecondForm = document.querySelector("#link");
const Title = document.querySelector(".grid__title");
const Image = document.querySelector(".grid__image");
const likeIcon = document.querySelector(".grid__icon");
const gridContainer = document.querySelector(".grid__section");
const gridDelete = document.querySelectorAll(".grid__delete-icon");
const gridTitle = document.querySelectorAll(".grid__title");


//funcion que elimina la clase que muestra el formulario//
const remove = () => {
  form.classList.remove("form-open");
  console.log("funciona");
  nameForm.setCustomValidity('');
};


icon.addEventListener("click", function () {
  form.classList.add("form-open");

});

close.addEventListener("click", function () {
  console.log("click");
  remove();
});

save.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(headerSubtitle)
  headerSubtitle.textContent = nameForm.value;
  headerDescription.textContent = aboutForm.value;
  remove();
});

nameForm.value = headerSubtitle.textContent;
aboutForm.value = headerDescription.textContent;


add.addEventListener("click", function () {
  secondForm.classList.add("form-open");
});

closeForm.addEventListener("click", function () {
  console.log("click");
  secondForm.classList.remove("form-open");
});

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

function addCard(gridImage, gridTitle) {
  const gridTemplate = document.querySelector("#gridTemplate").content;
  const gridElement = gridTemplate.querySelector(".grid__card").cloneNode(true);
  gridElement.querySelector(".grid__image").src = gridImage;
  gridElement.querySelector(".grid__title").textContent = gridTitle;
  gridElement.querySelector(".grid__image").alt = gridTitle;
  gridElement.querySelector(".grid__icon").addEventListener("click", function (evt) {
    evt.target.classList.toggle("grid__icon-active");

  });
  gridElement.querySelector(".grid__delete-icon").addEventListener("click", function (evt) {
    const card = evt.target.closest(".grid__card");
    if (card) card.remove();
  });
  gridContainer.prepend(gridElement);
}

initialCards.forEach(function (card) {
  addCard(card.link, card.name);
});
saveSecondForm.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(linkSecondForm);
  console.log(linkSecondForm.value);
  addCard(linkSecondForm.value, nameSecondForm.value);
  linkSecondForm.value = "";
  nameSecondForm.value = "";
  secondForm.classList.remove("form-open");
});

const images = document.querySelectorAll(".grid__image");
const modal = document.querySelector("#imageModal");
const modalImg = document.querySelector('#modalImg');
const modalCaption = document.querySelector('#modalCaption');
const closeBtn = document.querySelector('#closeModal');

images.forEach((img) => {
  img.addEventListener("click", (e) => {
    modal.style.display = 'flex';
    modalImg.src = img.src;
    modalCaption.textContent = img.alt;
  });
});
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

//para que se cierre con esc//

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    modal.style.display = 'none';
  }
});

//validacion de formularios//

//muestra el error
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

//oculta el error 

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

//verificar la validez del input 

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
//Funcion que verifica si hay un input invalido

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//funcion que cambia el estado del boton

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("form__button_inactive");
    buttonElement.disabled = false;
  }
};

//asigna los eventos de escucha a los inputs 

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
      setEventListeners(formElement);
    });
};
enableValidation();


