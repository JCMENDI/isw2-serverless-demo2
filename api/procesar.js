export default function handler(req, res) {
  const nombre = req.query.nombre || "anónimo";
  
  // 1. Simular error si el nombre es "error" [cite: 120]
  if (nombre.toLowerCase() === "error") {
    return res.status(500).json({
      error: "Error simulado en la lógica de negocio",
      detalle: "Se recibió la palabra reservada 'error'"
    });
  }

  // 2. Agregar un timestamp [cite: 119]
  const timestamp = new Date().toISOString();

  // 3. Devolver respuesta exitosa [cite: 31, 35]
  res.status(200).json({
    resultado: `Nombre procesado: ${nombre.toUpperCase()}`,
    timestamp: timestamp,
    mensaje: "Procesamiento completado con éxito"
  });
}
