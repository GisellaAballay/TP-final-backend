import { createUser, findUserByUsername } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const SECRET_KEY = "PanConManteca";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: "El usuario ya existe" });
  }

  const newUser = await createUser({
    id: crypto.randomUUID(),
    username,
    password,
  });

  res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const user = findUserByUsername(username);
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

  res.status(200).json({ message: "Inicio de sesión exitoso", token });
};

