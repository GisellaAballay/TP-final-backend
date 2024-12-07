import Alumno from "../models/alumnoModels.js";
import Turno from "../models/turnoModels.js";
import User from "../models/userModels.js";

const enrollAlumno = async (req, res) => {
  try {
    const { username, turnosSeleccionados } = req.body;
    if (!username || !turnosSeleccionados) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Usurario no encontrado" });
    }

    const turnosValidos = await Turno.find({ _id: { $in: turnosSeleccionados } });
    if (turnosValidos.length !== turnosSeleccionados.length) {
      return res.status(400).json({ error: "Algunos turnos no son válidos" });
    }

    const alumno = await Alumno.findOneAndUpdate(
      { userId: user._id },
      { username, turnosSeleccionados },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Alumno inscrito con éxito", alumno });
  } catch (error) {
    res.status(500).json({ error: "Error al inscribir al alumno" });
  }
};

const getMe = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.alumnoId);
    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.status(200).json(alumno);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el alumno" });
  }
}; 

const updateTurnos = async (req, res) => {
  try {
    const { turnosSeleccionados } = req.body;
    const turnosValidos = await Turno.find({ _id: { $in: turnosSeleccionados } });
    if (turnosValidos.length !== turnosSeleccionados.length) {
      return res.status(400).json({ error: "Algunos turnos no son válidos" });
    }

    const alumno = await Alumno.findByIdAndUpdate(
      req.alumnoId,
      { turnosSeleccionados },
      { new: true }
    );
    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    };
    res.status(200).json({
      message: "Turnos actualizados con éxito",
      turnosSeleccionados: alumno.turnosSeleccionados,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar los turnos" });
  }
};

const deleteAlumno = async (req, res) => {
  try {
    const alumnoId = req.params.id; 
    const alumno = await Alumno.findByIdAndDelete(alumnoId);

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    res.status(200).json({ message: "Alumno eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el alumno" });
  }
};

export { enrollAlumno, getMe, updateTurnos, deleteAlumno }