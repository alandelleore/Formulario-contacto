//VARIABLES
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//Expresion Regular
const re =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

eventListeners();
function eventListeners() {
  //Cuando la app arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("keyup", validarFormulario);

  //Reinicia el formulario
  btnReset.addEventListener("click", resetearFormulario);

  // Enviar Email
  formulario.addEventListener("submit", enviarEmail);
}

//Funciones
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");

  email.classList.remove("opacity-50", "border", "border-green-500");
  asunto.classList.remove("opacity-50", "border", "border-green-500");
  mensaje.classList.remove("opacity-50", "border", "border-green-500");
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

//Valida el Formulario
function validarFormulario(e) {
  if (e.target.value.length > 0) {
    e.target.classList.add("border", "border-green-500");
    //Elimina los errores...
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");

    mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    //const resultado = e.target.value.indexOf('@');
    if (re.test(e.target.value)) {
      e.target.classList.add("border", "border-green-500");
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("El email no es valido");
    }
  }

  if (email.value !== "" && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

//Enviar email
function enviarEmail(e) {
  e.preventDefault();
  if (email.type === "email") {
    if (email.value !== "" && asunto.value !== "" && mensaje.value !== "") {
      //Mostrar spinner

      const spinner = document.querySelector("#spinner");
      spinner.style.display = "flex";

      email.classList.add("opacity-50");
      asunto.classList.add("opacity-50");
      mensaje.classList.add("opacity-50");

      //TIMMER
      setTimeout(() => {
        spinner.style.display = "none";

        //Mensaje se envio correctamente
        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje se envió correctamente.";
        parrafo.classList.add(
          "text-center",
          "my-10",
          "p-2",
          "bg-green-500",
          "text-white"
        );

        //Insertamos el mensaje antes del spinner
        formulario.insertBefore(parrafo, spinner);
        resetearFormulario(e);

        setTimeout(() => {
          parrafo.remove(); //ELIMINAR MENSAJE
          iniciarApp(); //PARA VOLVER A DESABILIAR EL BOTON DE ENVÍAR
        }, 4000);
      }, 3000);
    } else {
      mostrarError("Campo no valido");
    }
  }
}
//RESET FORMULARIO

function resetearFormulario(e) {
  e.preventDefault();
  formulario.reset();
  iniciarApp();
}
