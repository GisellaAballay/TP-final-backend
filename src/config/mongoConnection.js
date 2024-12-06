// Configuración para la conexón de db

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
process.loadEnvFile();

const URI_DB = process.env.URI_DB;

const connectDb = async () => {
  try{
    await mongoose.connect(URI_DB);
    console.log("Conexión exitosa");
  } catch {
    console.log("Conexión fallida");
  };
};

export { connectDb }