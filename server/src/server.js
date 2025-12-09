// src/server.js
import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

async function startServer() {
  const app = Fastify();

  // CORS
  await app.register(cors);

  // Rotas
  app.register(userRoutes, { prefix: "/users" });

  // Conexão com Mongo
  await connectDB(); // mantém o await para não quebrar o server depois

  // Rota principal
  app.get("/", () => {
    return { ok: true, msg: "API funcionando!" };
  });

  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🔥 Server running on http://localhost:3000");
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
}

startServer();
