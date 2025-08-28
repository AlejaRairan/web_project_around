const icon = document.querySelector("#openForm");
const form = document.querySelector("#form");
const close = document.querySelector("#closeForm");
const save = document.querySelector("#saveForm");
const headerSubtitle = document.querySelector("#nameInput");
const headerDescription = document.querySelector("#aboutInput");
const nameForm = document.querySelector("#name");
const aboutForm = document.querySelector("#about");
const iLike = document.querySelector("#corazon");

/* const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
  */

icon.addEventListener("click", function() {
    form.classList.add("form-open");

});
close.addEventListener("click", function() {
    console.log("click");   
    form.classList.remove("form-open");
});

save.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(headerSubtitle)
  headerSubtitle.textContent = nameForm.value;
  headerDescription.textContent = aboutForm.value;
  form.classList.remove("form-open");  
});


iLike.addEventListener("click", function() {
  iLike.classList.toggle("grid__icon-active");
});

nameForm.value = headerSubtitle.textContent;
aboutForm.value = headerDescription.textContent;

/** *
const gridTemplate = document
.querySelector("#grid-template");
.querySelector(".grid");


const getGridElement = (data) => {
  const GridElement = 
  */ 