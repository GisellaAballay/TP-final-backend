import Alumno from "../models/alumnoModels.js";

const turnos = [
  {id: "1", name: "Técnica", hours: "Lunes y Miercoes: 20hs"},
  {id: "2", name: "Jazz", hours: "Martes, Jueves y Viernes: 19hs"},
  {id: "3", name: "Heels", hours: "Lunes y Miercoles: 18hs"},
  {id: "4", name: "Theatre Jazz", hours: "Martes, jueves y Viernes: 20hs"},
  {id: "5", name: "Invertidas", hours: "Lunes, Martes Y Miercoles: 21hs"},
  {id: "6", name: "Flexi", hours: "Lunes, Miercoles y Viernes: 17hs"},
];

export const getMe = async (req, res) => {
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

export const updateTurnos = async (req, res) => {
  try {
    const { turnosSeleccionados } = req.body;
    const turnosValidos = turnosSeleccionados.every((id) =>
      turnos.some((t) => t.id === id)
    );
    if (!turnosValidos) {
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

