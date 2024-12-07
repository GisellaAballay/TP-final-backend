// Manipulación de la base de datos
// Retorna esta petición en la base de dtos al controller

import mongoose from "mongoose";

// definir schema de la entidad
const alumnoSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  username: {type: String, required: true},
  email: {
    type: String, 
    required: true, 
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {type: String, required: true },
  turnosSeleccionados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Turno" }]
});

const Alumno = mongoose.model("Alumno", alumnoSchema);

export default Alumno;
