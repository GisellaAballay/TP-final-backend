import jwt from "jsonwebtoken";

const SECRET_KEY = "PanConManteca";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.alumnoId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};
