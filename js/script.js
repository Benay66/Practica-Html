const CREDENCIALES = {
  usuario: "admin",
  password: "1234"
};

let intentosLogin = 0;

function mostrarMensaje(texto, tipo = "info") {
  const colores = {
    info: "#35657d",
    success: "#198754",
    error: "#dc3545"
  };
  alert(texto); // simple; se podría mejorar con un div en el DOM
  console.log(`[${tipo.toUpperCase()}] ${texto}`);
}

async function validarLogin(event) {
  event.preventDefault(); 

  const usuarioInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const mensajeError = document.getElementById("mensaje-error");

  if (!usuarioInput || !passwordInput) {
    console.error("No se encontraron los campos del formulario de login");
    return;
  }

  const usuario = usuarioInput.value.trim();
  const password = passwordInput.value;

  if (usuario === "" || password === "") {
    if (mensajeError) {
      mensajeError.textContent = "Por favor completa todos los campos para hacer el login.";
      mensajeError.style.display = "block";
    } else {
      mostrarMensaje("Por favor completa todos los campos.", "error");
    }
    return;
  }

  try {
    // Petición POST a tu API local ejecutándose en el puerto 3000
    const respuesta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usuario,
        password: password
      })
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      intentosLogin = 0;
      if (mensajeError) mensajeError.style.display = "none";
      mostrarMensaje("¡Inicio de sesión correcto! Redirigiendo al perfil...", "success");
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 800);
    } else {
      intentosLogin++;
      const msg = datos.message || `Credenciales incorrectas. Intento ${intentosLogin}.`;
      if (mensajeError) {
        mensajeError.textContent = msg;
        mensajeError.style.display = "block";
      } else {
        mostrarMensaje(msg, "error");
      }
      console.warn("Login fallido en la API. Intentos:", intentosLogin);
    }

  } catch (error) {
    console.error("Error de conexión con el backend:", error);
    if (mensajeError) {
      mensajeError.textContent = "No se pudo conectar con el servidor (Backend apagado o inaccesible).";
      mensajeError.style.display = "block";
    }
  }
}

function cambiarTitulo() {
  const titulo = document.querySelector("header h1");
  if (titulo) {
    titulo.textContent = "¡Título cambiado con JavaScript!";
    titulo.style.color = "#8a4b30";
  }
}

function mostrarInfoArreglo() {
  const colores = ["azul", "rojo", "verde", "amarillo"];
  let texto = "Arreglo de colores:\n";
  for (let i = 0; i < colores.length; i++) {
    texto += `  [${i}] = ${colores[i]}\n`;
  }
  colores.forEach((c, idx) => console.log(`forEach: ${idx} -> ${c}`));
  alert(texto);
}

function crearObjetoAlumno() {
  // Objeto literal
  const alumno = {
    nombre: "Luis",
    edad: 20,
    imprime() {
      return `${this.nombre} tiene ${this.edad} años`;
    }
  };

  class Alumno {
    constructor(nombre, edad) {
      this.nombre = nombre;
      this.edad = edad;
    }
    imprime() {
      return `${this.nombre} tiene ${this.edad} años`;
    }
  }

  const luis = new Alumno("Roberto", 21);
  alert(alumno.imprime() + "\n" + luis.imprime());
}

function demostrarCondicionales() {
  const hora = new Date().getHours();
  let saludo;
  if (hora < 12) {
    saludo = "Buenos días";
  } else if (hora < 19) {
    saludo = "Buenas tardes";
  } else {
    saludo = "Buenas noches";
  }
  alert(`${saludo}. La hora actual es ${hora}:00 aprox.`);
}

function demostrarBucles() {
  let resultado = "Contando del 1 al 5 con for:\n";
  for (let i = 1; i <= 5; i++) {
    resultado += i + " ";
  }
  resultado += "\n\nWhile (cuenta regresiva): ";
  let n = 3;
  while (n > 0) {
    resultado += n + " ";
    n--;
  }
  alert(resultado);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js cargado correctamente.");

  // Login form
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", validarLogin);
  }

  const btnTitulo = document.getElementById("btn-cambiar-titulo");
  if (btnTitulo) btnTitulo.addEventListener("click", cambiarTitulo);

  const btnArreglo = document.getElementById("btn-arreglo");
  if (btnArreglo) btnArreglo.addEventListener("click", mostrarInfoArreglo);

  const btnObjeto = document.getElementById("btn-objeto");
  if (btnObjeto) btnObjeto.addEventListener("click", crearObjetoAlumno);

  const btnCond = document.getElementById("btn-condicionales");
  if (btnCond) btnCond.addEventListener("click", demostrarCondicionales);

  const btnBucles = document.getElementById("btn-bucles");
  if (btnBucles) btnBucles.addEventListener("click", demostrarBucles);
});
