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
let userId;
let selectedCard = null;

// modal de imagen

const closeBtn = document.querySelector("#closeModal");

// Información de usuario

const userInfo = new UserInfo({
  nameSelector: "#nameInput",
  aboutSelector: "#aboutInput",
});

const renderLoading = (isLoading, button, defaultText = "Guardar") => {
  if (isLoading) {
    button.textContent = "Guardando...";
    button.disabled = true;
  } else {
    button.textContent = defaultText;
    button.disabled = false;
  }
};

api.getUserInfo().then((user) => {
  userId = user._id;
  userInfo.setUserInfo({
    name: user.name,
    about: user.about,
  });
  document.querySelector(".header__image").src = user.avatar;
});

// Manejar guardado del formulario de perfil
const handleFormEdit = (formData) => {
  const submitButton = form.querySelector(".form__submit");
  renderLoading(true, submitButton);

  api
    .createDescription(formData)
    .then((data) => {
      headerSubtitle.textContent = data.name;
      headerDescription.textContent = data.about;
      userInfo.setUserInfo({
        name: data.name,
        about: data.about,
      });
      remove();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton);
    });
};

//manejar guardado del formulario de avatar
const handleFormSubmit = (formData) => {
  const submitButton = openAvatarForm.querySelector(".form__submit");
  renderLoading(true, submitButton, "Guardar");

  api
    .updateUserInfo(formData.avatar)
    .then((data) => {
      document.querySelector(".header__image").src = data.avatar;
      remove();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton, "Guardar");
    });
};

const handleDeleteClick = (cardInstance) => {
  selectedCard = cardInstance;
  formValidator3.setSubmitAction(() => {
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        selectedCard.removeCard();
        selectedCard = null;
        formValidator3.close();
      })
      .catch(console.error);
  });

  formValidator3.open();
};

// Función para cerrar y limpiar el formulario de perfil
const remove = () => {
  form.classList.remove("form-open");
  openAvatarForm.classList.remove("form-open");
  secondForm.classList.remove("form-open");

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
const addCard = ({ name, link }) => {
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
};

// Popup editar perfil
const edit = new PopupwithForm("#form", handleFormEdit);
edit.setEventListeners();

// Popup agregar tarjeta
const popupCard = new PopupwithForm("#formAdd", addCard);
popupCard.setEventListeners();

//popup editar avatar
const avatar = new PopupwithForm("#avatarForm", handleFormSubmit);
avatar.setEventListeners();

//Abrir formulario de foto

editAvatar.addEventListener("click", function () {
  openAvatarForm.classList.add("form-open");
});

// Abrir formulario de editar perfil
icon.addEventListener("click", function () {
  edit.open();
  nameForm.value = headerSubtitle.textContent;
  aboutForm.value = headerDescription.textContent;
});

// Abrir formulario de nuevas tarjetas
add.addEventListener("click", () => {
  popupCard.open();
});


// instancia popup confirmation
const formValidator3 = new PopupwithConfirmation(".confirmation__container");
formValidator3.setEventListeners();

const imagePopup = new PopupwithImage("#modalContainer");
imagePopup.setEventListeners();

const handleLikeClick = (cardInstance) => {
  console.log(cardInstance);
  if (!cardInstance._isLiked) {
    api
      .likeCard(cardInstance._id)
      .then(() => {
        cardInstance.setLikeState(true);
      })
      .catch(console.error);
  } else {
    api
      .unlikeCard(cardInstance._id)
      .then(() => {
        cardInstance.setLikeState(false);
      })
      .catch(console.error);
  }
};

api.loadCard().then((initialCards) => {
  const section = new Section({
    items: initialCards,
    renderer: (item) => {
      console.log(item);
      const card = new Card(
        {
          name: item.name,
          link: item.link,
          _id: item._id,
          isLiked: item.isLiked,
        },

        "#gridTemplate",
        () => imagePopup.open({ link: item.link, name: item.name }),
        handleDeleteClick,
        handleLikeClick
      );

      section.addItem(card.generateCard());
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

const formValidator4 = new FormValidator(openAvatarForm);
formValidator4._enableValidation();
