import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/procesar.js";

test("procesar convierte el nombre a mayúsculas", () => {
  const req = { query: { nombre: "juan" } };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
  resultado: "Nombre procesado: JUAN",
  longitud: 4
  });
});
test("procesar maneja nombre ausente", () => {
  const req = { query: {} };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(res.body.resultado.includes("ANÓNIMO"));
});
test("procesar cumple política de calidad: estructura y mayúsculas", () => {
    const req = { query: { nombre: "prueba de calidad" } };
    const res = {
        statusCode: null,
        body: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        }
    };

    handler(req, res);
    // 1. Validación de Estructura 
    // Nos aseguramos de que el objeto devuelto tenga la propiedad crítica 'resultado'
    assert.ok(Object.hasOwn(res.body, 'resultado'), "El JSON debe contener la clave 'resultado'");

    // 2. Validación de Regla de Calidad (Mayúsculas obligatorias)
    // Extraemos el valor y verificamos que NO tenga minúsculas
    const resultadoTexto = res.body.resultado; // "Nombre procesado: PRUEBA DE CALIDAD"
    
    // Usamos una Expresión Regular para asegurar que la parte del nombre esté en mayúsculas
    // Asumimos el formato: "Nombre procesado: <NOMBRE>"
    const nombreProcesado = resultadoTexto.split(": ")[1]; 
    
    // La regex /^[A-ZÁÉÍÓÚÑ\s]+$/ valida que solo haya mayúsculas y espacios
    assert.match(nombreProcesado, /^[A-ZÁÉÍÓÚÑ\s]+$/, "El nombre procesado debe estar estrictamente en mayúsculas");
});

