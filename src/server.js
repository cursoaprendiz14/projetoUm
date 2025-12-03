import Fastify from "fastify";
import cors from "fastify-cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js"

const app = Fastify();

app.register(cors);


app.register(userRoutes, { prefix: "/users" });

connectDB();

app.get("/", async () => {
  return { ok: true, msg: "API funcionando!" };
});

app.listen(
    { port:3000, host:"0.0.0.0" },
    () => {
    console.log(" Server running on http://localhost:3000");
}
);