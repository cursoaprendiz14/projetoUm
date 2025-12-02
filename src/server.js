import Fastify from "fastify";
import cors from "fastify-cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.routes"

const app = Fastify();

app.register(cors);
app.register(userRoutes, { prefix: "/users" });

connectDB();

app.listen(3000, "0.0.0.0", () => {
    console.log(" Server running on http://localhost:3000");
});