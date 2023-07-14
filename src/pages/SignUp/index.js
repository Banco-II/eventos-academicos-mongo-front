import { Container, Form } from "../SignIn/style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { signUp } from "../../services/userApi";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  function handleForm(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function createAccount(e) {
    e.preventDefault();

    try {
      const userData = await signUp(form);
      console.log(userData);
      toast("Cadastro realizado com sucesso!");
      navigate("/")
    } catch (error) {
      console.log(error.message);
      toast("Usuário ou senha indisponíveis");
    }
  }

  return (
    <Container>
      <Form onSubmit={createAccount}>
        <h1>Crie o seu cadastro</h1>
        <label htmlFor="name">name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleForm}
          required
          placeholder="Your Name"
        />
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
        <button type="submit">Criar Cadastro</button>
        <h2 onClick={() => navigate("/")}>Já possui cadastro?</h2>
      </Form>
    </Container>
  );
}
