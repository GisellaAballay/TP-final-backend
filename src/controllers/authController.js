import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mi_secreto_super_seguro"; // Cambia esta clave en producción

let alumnos = []; // Puedes mover esto a un archivo de datos o usar una base de datos

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  if (alumnos.some((a) => a.email === email)) {
    return res.status(400).json({ error: "El email ya está registrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAlumno = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
    turnosSeleccionados: [],
  };

  alumnos.push(newAlumno);
  res.status(201).json({ message: "Alumno registrado con éxito" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const alumno = alumnos.find((a) => a.email === email);
  if (!alumno) return res.status(401).json({ error: "Credenciales incorrectas" });

  const isMatch = await bcrypt.compare(password, alumno.password);
  if (!isMatch) return res.status(401).json({ error: "Credenciales incorrectas" });

  const token = jwt.sign({ id: alumno.id }, SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({ message: "Autenticación exitosa", token });
};
