import express from "express";
import { getMe, updateTurnos } from "../controllers/alumnoController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, getMe);
router.put("/me/turnos", verifyToken, updateTurnos);

export default router;
