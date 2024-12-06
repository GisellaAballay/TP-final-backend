import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import alumnoRoutes from "./src/routes/alumnoRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import { connectDb } from "./src/config/mongoConnection.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 1507;


const startServer = async () => {
  try {
    await connectDb(); 
    console.log("Conexión a MongoDB exitosa");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1)
  };
}


startServer();
