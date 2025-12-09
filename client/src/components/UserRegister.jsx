import { useState } from "react";

export default function UserRegister() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.password !== form.confirmPassword) {
            return setError ("As senhas devem ser iguais.");
        }

        try {
            const res = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password
                })
            });

            if (!res.ok) return setError("Erro ao cadastrar usuário.");

            setSuccess("Usuário cadastrado com sucesso!");
            setForm({ name: "", email: "", password: "", confirmPassword: ""});

        } catch (err) {
            setError("Falha ao conectar ao servidor.");
            console.error(err);
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Cadastro de Usuário</h2>

            <form onSubmit={handleSubmit} style={StyleSheet.form}>
                <input 
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={form.name}
                    onChange={handleChange}
                    style={styles.input}
                    required 
                    />

                <input 
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={form.password}
                    onChange={handleChange}
                    style={styles.input}
                    required 
                    />

                <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    style={styles.input}
                    required 
                    />

                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.sucess}>{success}</p>}

                <button type="submit" style={styles.button}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    background: "#fff"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    background: "#4F46E5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "0.9rem"
  },
  success: {
    color: "green",
    fontSize: "0.9rem"
  }
};