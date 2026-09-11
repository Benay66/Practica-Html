let datosPaises = [];

async function cargarPaises() {
  try {
    const respuesta = await fetch("./data/countries.json");
    if (!respuesta.ok) throw new Error("No se pudo cargar countries.json");
    datosPaises = await respuesta.json();
    llenarSelectPaises();
  } catch (error) {
    console.error("Error cargando países:", error);
    datosPaises = [
      {
        countryName: "México",
        countryShortCode: "MX",
        regions: [
          { name: "Ciudad de México", shortCode: "CMX" },
          { name: "Jalisco", shortCode: "JAL" },
          { name: "Nuevo León", shortCode: "NLE" }
        ]
      },
      {
        countryName: "España",
        countryShortCode: "ES",
        regions: [
          { name: "Madrid", shortCode: "MD" },
          { name: "Cataluña", shortCode: "CT" },
          { name: "País Vasco", shortCode: "PV" }
        ]
      },
      {
        countryName: "Estados Unidos",
        countryShortCode: "US",
        regions: [
          { name: "California", shortCode: "CA" },
          { name: "Texas", shortCode: "TX" },
          { name: "Nueva York", shortCode: "NY" }
        ]
      }
    ];
    llenarSelectPaises();
  }
}

function llenarSelectPaises() {
  const selectPais = document.getElementById("select-pais");
  if (!selectPais) return;

  selectPais.innerHTML = '<option value="">-- Selecciona un país --</option>';
  datosPaises.forEach((pais) => {
    const option = document.createElement("option");
    option.value = pais.countryShortCode;
    option.textContent = pais.countryName;
    selectPais.appendChild(option);
  });
}

function llenarRegiones(codigoPais) {
  const selectRegion = document.getElementById("select-region");
  if (!selectRegion) return;

  selectRegion.innerHTML = '<option value="">-- Selecciona una región --</option>';
  selectRegion.disabled = true;

  if (!codigoPais) return;

  const pais = datosPaises.find((p) => p.countryShortCode === codigoPais);
  if (!pais || !pais.regions) return;

  pais.regions.forEach((region) => {
    const option = document.createElement("option");
    option.value = region.shortCode || region.name;
    option.textContent = region.name;
    selectRegion.appendChild(option);
  });
  selectRegion.disabled = false;
}

function manejarRadios() {
  const radios = document.querySelectorAll('input[name="opcion-radio"]');
  const contenidoOculto = document.getElementById("contenido-radio");
  const btnActivadoPorRadio = document.getElementById("btn-por-radio");

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        if (contenidoOculto) {
          contenidoOculto.style.display = "block";
          contenidoOculto.innerHTML = `<p class="mb-0">Has seleccionado la opción: <strong>${radio.value}</strong></p>`;
        }
        // Activar botón
        if (btnActivadoPorRadio) {
          btnActivadoPorRadio.disabled = false;
          btnActivadoPorRadio.classList.remove("btn-secondary");
          btnActivadoPorRadio.classList.add("btn-success");
        }
      }
    });
  });
}

function manejarCheckboxes() {
  const check1 = document.getElementById("check1");
  const check2 = document.getElementById("check2");
  const btnChecks = document.getElementById("btn-checks");

  function actualizarBoton() {
    if (check1 && check2 && btnChecks) {
      const ambos = check1.checked && check2.checked;
      btnChecks.disabled = !ambos;
      if (ambos) {
        btnChecks.classList.remove("btn-secondary");
        btnChecks.classList.add("btn-primary");
      } else {
        btnChecks.classList.remove("btn-primary");
        btnChecks.classList.add("btn-secondary");
      }
    }
  }

  if (check1) check1.addEventListener("change", actualizarBoton);
  if (check2) check2.addEventListener("change", actualizarBoton);
}

function configurarBotonesAccion() {
  const btnRadio = document.getElementById("btn-por-radio");
  if (btnRadio) {
    btnRadio.addEventListener("click", () => {
      const seleccionado = document.querySelector('input[name="opcion-radio"]:checked');
      alert(seleccionado ? `Acción ejecutada con: ${seleccionado.value}` : "Ninguna opción seleccionada");
    });
  }

  const btnChecks = document.getElementById("btn-checks");
  if (btnChecks) {
    btnChecks.addEventListener("click", () => {
      alert("¡Ambos checkboxes están marcados! Formulario listo para enviar.");
    });
  }

  const form = document.getElementById("form-practica");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const pais = document.getElementById("select-pais")?.value;
      const region = document.getElementById("select-region")?.value;
      alert(`Datos del formulario:\nPaís: ${pais || "(ninguno)"}\nRegión: ${region || "(ninguna)"}`);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("formulario.js cargado.");
  cargarPaises();
  manejarRadios();
  manejarCheckboxes();
  configurarBotonesAccion();

  const selectPais = document.getElementById("select-pais");
  if (selectPais) {
    selectPais.addEventListener("change", (e) => {
      llenarRegiones(e.target.value);
    });
  }
});
