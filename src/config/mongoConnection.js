import mongoose from "mongoose"
process.loadEnvFile();

const URI_DB = process.env.URI_DB

const connectDb = async () => {
  await mongoose.connectDb(URI_DB)
}

export { connectDb }