import express from "express";
import { registerAlumno, getMe, updateTurnos, deleteAlumno } from "../controllers/alumnoController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAlumno)
router.get("/me", verifyToken, getMe);
router.put("/me/turnos", verifyToken, updateTurnos);
router.delete("/:id", verifyToken, deleteAlumno);

export default router;