import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await
    mongoose.connect("mongodb://mongo27017/projetoUm");
    console.log("MongoDB conectado!");
    } catch (err) {
        console.error("Erro ao conectar no Mongo:", err);
        process.exit(1);
    }
};