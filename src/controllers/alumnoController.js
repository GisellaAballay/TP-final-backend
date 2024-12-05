let alumnos = [];
let turnos = [
  { id: "1", name: "Técnica", hours: "Lunes y Miércoles: 20hs" },
  { id: "2", name: "Jazz", hours: "Martes, Jueves y Viernes: 19hs" },
];

export const getMe = (req, res) => {
  const alumno = alumnos.find((a) => a.id === req.alumnoId);
  if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });

  res.status(200).json(alumno);
};

export const updateTurnos = (req, res) => {
  const { turnosSeleccionados } = req.body;

  const alumno = alumnos.find((a) => a.id === req.alumnoId);
  if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });

  const turnosValidos = turnosSeleccionados.every((id) =>
    turnos.some((t) => t.id === id)
  );
  if (!turnosValidos) {
    return res.status(400).json({ error: "Algunos turnos no son válidos" });
  }

  alumno.turnosSeleccionados = turnosSeleccionados;
  res.status(200).json({ message: "Turnos actualizados con éxito", turnosSeleccionados });
};
