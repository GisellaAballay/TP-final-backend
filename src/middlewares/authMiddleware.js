// Se utiliza para protejer rutas

import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "PanConManteca";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expirado" });
    } else {
      res.status(401).json({ error: "Token inválido" });
    }
  }
};
