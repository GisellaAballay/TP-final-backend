import express from "express";
import { enrollAlumno, getMe, updateTurnos, deleteAlumno } from "../controllers/alumnoController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/inscribir", enrollAlumno)
router.get("/me", verifyToken, getMe);
router.put("/me/turnos", verifyToken, updateTurnos);
router.delete("/:id", verifyToken, deleteAlumno);

export default router;
