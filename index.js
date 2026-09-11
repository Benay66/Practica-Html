console.log("=== Hola desde Node.js ===");
console.log("Prueba de funcionamiento de Node.js y JavaScript fuera del navegador.\n");

const nombreCurso = "TC2005B - Construcción de software";
let contador = 0;

const mensaje = "Hola Mundo!";          
const numero = 42;                      
const activo = true;                    
const indefinido = undefined;
const nulo = null;

const datos = ["JavaScript", 2026, true, "Node.js"];

const estudiante = {
  nombre: "Julen Benages",
  edad: 20,
  curso: nombreCurso,
  imprime() {
    console.log(`Estudiante: ${this.nombre}, Curso: ${this.curso}`);
  }
};

function saludar(nombre) {
  return `¡Bienvenido, ${nombre}!`;
}

contador += 1;
if (contador === 1) {
  console.log(saludar("usuario"));
}

console.log("\nElementos del arreglo:");
for (let i = 0; i < datos.length; i++) {
  console.log(`  [${i}] => ${datos[i]} (tipo: ${typeof datos[i]})`);
}

datos.forEach((item, index) => {
  console.log(`forEach índice ${index}: ${item}`);
});

estudiante.imprime();

console.log("\n=== Fin de la prueba de Node.js ===");
