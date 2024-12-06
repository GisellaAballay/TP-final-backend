// Manipulación de la base de datos
// Retorna esta petición en la base de dtos al controller

import mongoose from "mongoose";

// definir schema de la entidad
const alumnoSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: email},
  horario: {type: String}
});

