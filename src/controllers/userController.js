import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [];

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: "El usuario ya existe" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "Usuario registrado correctamente" });
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, "clave-secreta", {
    expiresIn: "1h", 
  });

  res.status(200).json({ message: "Inicio de sesión exitoso", token });
};
