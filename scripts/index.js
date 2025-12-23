// Imports
import { FormValidator } from "./formValidator.js";
import { Card } from "./Card.js";
import { closeModal } from "./utils.js";
import { PopupwithForm } from "./PopupwithForm.js";
import { Section } from "./Section.js";
import { UserInfo } from "./Userinfo.js";
import { PopupwithImage } from "./PopupwithImage.js";
import { api } from "./api.js";
import { PopupwithConfirmation } from "./PopupwithConfirmation.js";

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

//formulario de cambiar imagen
const editAvatar = document.querySelector("#editAvatar");
const openAvatarForm = document.querySelector("#avatarForm");

// modal de imagen

const closeBtn = document.querySelector("#closeModal");

// Información de usuario

const userInfo = new UserInfo({
  nameSelector: "#nameInput",
  aboutSelector: "#aboutInput",
});
api.getUserInfo().then((user) => {
  userInfo.setUserInfo({ name: user.name, about: user.about });
});

// Manejar guardado del formulario de perfil
const handleFormEdit = () => {
  headerSubtitle.textContent = nameForm.value;
  headerDescription.textContent = aboutForm.value;
  userInfo.setUserInfo({ name: nameForm.value, about: aboutForm.value });
  remove();
};

// Función para cerrar y limpiar el formulario de perfil
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

// Popup editar perfil
const edit = new PopupwithForm("#form", handleFormEdit);
edit.setEventListeners();

// Popup agregar tarjeta
const addForm = new PopupwithForm("#formAdd");
addForm.setEventListeners();

//popup editar avatar
const avatar = new PopupwithForm("#avatarForm");
avatar.setEventListeners();
//Abrir formulario de foto

editAvatar.addEventListener("click", function () {
  avatar.open();
});

// Abrir formulario de editar perfil
icon.addEventListener("click", function () {
  edit.open();
  nameForm.value = headerSubtitle.textContent;
  aboutForm.value = headerDescription.textContent;
});

// Guardar cambios del formulario de perfil
api.createDescription().then(() => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(headerSubtitle);
  });
});

//Evento de abrir formulario de nuevas tarjetas (cards)

// Abrir formulario de nuevas tarjetas
add.addEventListener("click", function () {
  secondForm.classList.add("form-open");
});

// Cerrar formulario de nuevas tarjetas
closeForm.addEventListener("click", function () {
  secondForm.classList.remove("form-open");
  secondForm.reset();
});

// instancia popup confirmation
const formValidator3 = new PopupwithConfirmation(".confirmation__container");
formValidator3.setEventListeners();

// Guardar nueva tarjeta
secondForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = secondForm.querySelector("#title").value;
  const link = secondForm.querySelector("#link").value;
  api.createCard(name, link);
  const card = new Card({ name, link }, "#gridTemplate");
  const cardElement = card.generateCard();

  document.querySelector(".grid").prepend(cardElement);
  secondForm.classList.remove("form-open");
});


//Array de tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const imagePopup = new PopupwithImage("#modalContainer");
imagePopup.setEventListeners();

const handleDeleteClick = (cardInstance) => {
    formValidator3.open(cardInstance);
};


api.loadCard().then((initialCards) => {
  console.log(initialCards);
  const section = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#gridTemplate", () => 
        imagePopup.open({ link: item.link, name: item.name }),
      () => formValidator3.open()
      );

      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  });
  section.renderItems();
});

// Cerrar modal de imagen
closeBtn.addEventListener("click", closeModal);

//validar formularios
const formValidator1 = new FormValidator(form);
formValidator1._enableValidation();

const formValidator2 = new FormValidator(secondForm);
formValidator2._enableValidation();


