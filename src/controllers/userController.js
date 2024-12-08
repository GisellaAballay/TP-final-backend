import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  try{
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
    return res.status(400).json({ error: "El usuario ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Contraseña hasheada al resgistar:", hashedPassword);
    

    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("Usuario guardado", newUser);
    


    res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  };
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }
  try{
    const user = await User.findOne({ username });
    if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    console.log("Contraseña ingresada:", password);
    console.log("Contraseña almacenada (hash):", user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("¿Contraseña válida?:", isPasswordValid);
    
    if (!isPasswordValid) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }

  console.log("Solicitud de login recibida");

};

export { registerUser, loginUser }