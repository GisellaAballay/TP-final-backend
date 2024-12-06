import express from "express";
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

app.listen(PORT, () => {
  connectDb();
  console.log(`Server on http://localhost:${PORT}`);  
});

process.loadEnvFile();
