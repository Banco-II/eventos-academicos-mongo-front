import { useState } from "react";
import { Container, Form } from "./style";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/authApi";
import { toast } from "react-toastify";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleForm(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function login(e) {
    e.preventDefault();

    try {
      const userData = await signIn(form);
      console.log(userData);
      toast("Login realizado com sucesso");
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
      toast("Usuário ou senha não encontrados!");
    }
  }
  return (
    <Container>
      <Form onSubmit={login}>
        <h1>Login</h1>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleForm}
          required
          placeholder="Type Your Email"
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleForm}
          required
          placeholder="Your password"
        />
        <button type="submit">Entrar</button>
        <h2 onClick={() => navigate("/signUp")}>Não possui cadastro?</h2>
      </Form>
    </Container>
  );
}
