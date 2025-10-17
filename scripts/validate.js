//TODO: function tthat show an error 


//TODO: function taht hide an error 


//TODO: function that validate if we have an error 

//

//export function enableValidation() {

const form = document.querySelector('#myForm');

// Limpia el estado de validación nativo
form.querySelectorAll('input, select, textarea').forEach(el => {
  el.setCustomValidity(''); // limpia errores personalizados
  el.classList.remove('error', 'valid'); // o tus clases personalizadas
});

// También podés forzar que el form deje de mostrar errores
form.noValidate = true;
setTimeout(() => form.noValidate = false); // reactivarlo luego

 el.setCustomValidity(''); 