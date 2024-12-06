import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import alumnoRoutes from "./src/routes/alumnoRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/alumnos", alumnoRoutes);

const PORT = process.env.PORT || 1507;

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);  
});

process.loadEnvFile();
