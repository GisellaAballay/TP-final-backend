import express from "express";
import { log } from "node:console";
import crypto from "node:crypto";

let turnos = [
  {id: "1", name: "Técnica", hours: "Lunes y Miercoes: 20hs"},
  {id: "2", name: "Jazz", hours: "Martes, Jueves y Viernes: 19hs"},
  {id: "3", name: "Heels", hours: "Lunes y Miercoles: 18hs"},
  {id: "4", name: "Theatre Jazz", hours: "Martes, jueves y Viernes: 20hs"},
  {id: "5", name: "Invertidas", hours: "Lunes, Martes Y Miercoles: 21hs"},
  {id: "6", name: "Flexi", hours: "Lunes, Miercoles y Viernes: 17hs"},
];

let alumnos = [];

const app = express();
// Middleware
app.use(express.json());

// obtener todos los alumnos
app.get("/api/alumnos", (req, res) => {
  try {
    res.status(200).json(alumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// obtener alumno por id
app.get("/api/alumnos/:id", (req, res) => {
  const alumno = alumnos.find((alumno) => alumno.id === id);
  if(!alumno) return res.status(404).json({ error: "Alumno no encontrado" });
  res.status(200).json(alumno);
})

// Resgistrar nuevo alumno
app.post("/api/alumnos", (req, res) => {
  const { name, email, turnosSeleccionados} = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  // validar los turnos
  const turnosValidos = turnosSeleccionados?.every(
    (id) => turnos.some((turno) => turno.id ===id)
  );
  if (turnosSeleccionados && !turnosValidos) {
    return res.status(400).json({ error: "Algunos turnos no son válidos"})
  }

  const newAlumno = {
    id: crypto.randomUUID(),
    name,
    email,
    turnosSeleccionados: turnosSeleccionados || [],
  };

  alumnos.push(newAlumno);
  res.status(201).json(newAlumno);
});

// actualizar info del alumno con turno
app.put("/api/alumno/:id", (req, res) => {
  const { id } = req.params;
  const {name, email, turnosSeleccionados} = req.body;

  const alumno = alumnos.find((alumno) => alumno.id === id);
  if (!alumno) return res.status(404).json( { error: "Alumno no encontrado" });

  if(name) alumno.name = name;
  if(hours) alumno.email = email;

  // Validar y actualizar los turnos seleccionados
  if (turnosSeleccionados) {
    const turnosValidos = turnosSeleccionados.every((id) =>
      turnos.some((turno) => turno.id === id)
    );
    if (!turnosValidos) {
      return res.status(400).json({ error: "Algunos turnos no son válidos" });
    }
    alumno.turnosSeleccionados = turnosSeleccionados;
  }

  res.status(200).json(alumno);
});
 
// Eliminar alumno y sus tunos 

app.delete("/api/alumnos/:id", (req, res) => {
  const { id } = req.params;

  const alumnoIndex = alumnos.findIndex((alumno) => alumno.id === id);
  if (alumnoIndex === -1) {
    return res.status(404).json({ error: "Alumno no encontrado" });
  }

  const [deletedAlumno] = alumnos.splice(alumnoIndex, 1);
  res.status(200).json(deletedAlumno);
});


const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);  
});

process.loadEnvFile();
