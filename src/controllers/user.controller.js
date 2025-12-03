import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, reply) => {
    try {
        const { name, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashed });

        reply.send(user);

    } catch (err) {
        return reply.status(500).send({ error: err.message })
    }
};


export const login = async (req, reply) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return reply.status(400).send({ error: "Usuário não encontrado" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return reply.status(400).send({ error: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user._id },
            "segredo", { expiresIn: "1h" });

        reply.send({ token });
    } catch (err) {
        return reply.status(500).send({ erro: err.message });
    }
};