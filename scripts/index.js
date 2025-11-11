// Imports
import { FormValidator } from "./formValidator.js";
import { Card } from "./Card.js";
import { closeModal } from "./utils.js";

  // formularios y botones principales

const icon = document.querySelector("#openForm");
const form = document.querySelector("#form");
const close = document.querySelector("#closeForm");
const save = document.querySelector("#saveForm");
  // inputs del formulario de perfil y los elementos del header donde se reflejan

const headerSubtitle = document.querySelector("#nameInput");
const headerDescription = document.querySelector("#aboutInput");
const nameForm = document.querySelector("#name");
const aboutForm = document.querySelector("#about");

  // formulario para añadir tarjetas (cards)

const add = document.querySelector("#addButton");
const secondForm = document.querySelector("#formAdd");
const closeForm = document.querySelector("#closeSecondForm");

  // modal de imagen

const closeBtn = document.querySelector('#closeModal');


//funcion que elimina la clase que muestra el formulario//
const remove = () => {
  form.classList.remove("form-open");
  const errorMessages = form.querySelectorAll(".form__input-error");
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = "";
  });
  const inputElements = form.querySelectorAll(".form__input");
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove("form__input_type_error");
  });
  form.reset();
};

//Evento de abrir formulario 

icon.addEventListener("click", function () {
  form.classList.add("form-open");
  nameForm.value = headerSubtitle.textContent;
  aboutForm.value = headerDescription.textContent;
});

//Evento de cerrar formulario de perfil

close.addEventListener("click", function () {
  console.log("click");
  remove();
});

//Evento de guardar cambios del formulario de perfil

save.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(headerSubtitle)
  headerSubtitle.textContent = nameForm.value;
  headerDescription.textContent = aboutForm.value;
  remove();
});

//Evento de abrir formulario de nuevas tarjetas (cards)

add.addEventListener("click", function () {
  secondForm.classList.add("form-open");
});
//Evento de cerrar formulario de nuevas tarjetas (cards)

closeForm.addEventListener("click", function () {
  console.log("click");
  secondForm.classList.remove("form-open");
  secondForm.reset();
});

// cerrar el form de agregar 

secondForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = secondForm.querySelector("#title").value;
  const link = secondForm.querySelector("#link").value;

  const card = new Card({ name, link }, "#gridTemplate");
  const cardElement = card.generateCard();

  document.querySelector(".grid").prepend(cardElement);
   secondForm.classList.remove("form-open");
});

//Array de tarjetas iniciales
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

//Agregar las tarjetas iniciales al DOM
initialCards.forEach((item) => {
  const card = new Card(item, "#gridTemplate");
  const cardElement = card.generateCard();

  document.querySelector(".grid").append(cardElement);
});


//para que se cierre con esc//

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
});


//inicializar el pop up de las imagenes
closeBtn.addEventListener('click', closeModal);

//validar formularios
const formValidator1 = new FormValidator(form);
formValidator1._enableValidation();
const formValidator2 = new FormValidator(secondForm);
formValidator2._enableValidation();
