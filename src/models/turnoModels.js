
import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hours: { type: String, required: true },
});

const Turno = mongoose.model("Turno", turnoSchema);

export default Turno;