import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import alumnoRoutes from "./src/routes/alumnoRoutes.js";
import { connectDb } from "./src/config/mongoConnection.js"


const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/alumnos", alumnoRoutes);

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
