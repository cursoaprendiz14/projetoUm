import mongoose from "mongoose";

const MONGO_URI = "mongodb://mongo:27017/projetoUm";

export const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
         console.log("MongoDB conectado!");
    } catch (err) {
        console.error("Erro ao conectar no Mongo:", err);
         process.exit(1);
    }
};