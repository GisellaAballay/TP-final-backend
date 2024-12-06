// Manipulación de la base de datos
// Retorna esta petición en la base de dtos al controller

import mongoose from "mongoose";

// definir schema de la entidad
const alumnoSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {type: String, required: true },
  turnosSeleccionados: [{ type: String }]
});

const Alumno = mongoose.model("Alumno", alumnoSchema);

export default Alumno;
