import { createUser, login } from "../controllers/user.controller";

async function userRoutes(app, options) {
    app.post("/register", createUser);
    app.post("/login", login);
}

export default userRoutes;