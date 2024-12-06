import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Alumno from "../models/alumnoModel.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }
  try {
    const existingAlumno = await Alumno.findOne({ email });
    if (existingAlumno) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAlumno = new Alumno({
      name,
      email,
      password: hashedPassword,
      turnosSeleccionados: [],
    });
    await newAlumno.save(); 

    res.status(201).json({ message: "Alumno registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el alumno" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const alumno = await Alumno.findOne({ email });
    if (!alumno) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const isMatch = await bcrypt.compare(password, alumno.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: alumno._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Autenticación exitosa", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
