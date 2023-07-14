import { useState, useEffect } from "react";
import Evento from "../../components/Evento/Evento";
import Search from "../../components/Search/Search";
import axios from "axios";

import "./style.css";

export default function SearchLocation() {
  const [content, setContent] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [search, setSearch] = useState("");

  // const searchLowerCase = search.toLowerCase();

  // const filtroEvento = eventos.filter((e) =>
  //   e.titulo.toLowerCase().includes(searchLowerCase)
  // );

  useEffect(() => {
    const url = `http://localhost:4000/event/${search}`;

    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setEventos(res.data);
      })
      .catch((erro) => console.log(erro.res.message));
  }, [content]);

  // const [eventos, setEventos] = useState([
  //   {
  //     id: 1,
  //     titulo: "Primeiro evento",
  //     descricao: "Estudo",
  //     dataInicio: "01/02/2024",
  //     dataTermino: "04/02/2024",
  //   },
  //   {
  //     id: 2,
  //     titulo: "Segundo evento",
  //     descricao: "Estudo",
  //     dataInicio: "01/02/2024",
  //     dataTermino: "04/02/2024",
  //     isComplete: false,
  //   },
  //   {
  //     id: 3,
  //     titulo: "Terceiro evento",
  //     descricao: "Estudo",
  //     dataInicio: "01/02/2024",
  //     dataTermino: "04/02/2024",
  //     isComplete: false,
  //   },
  // ]);

  console.log(eventos)
  return (
    <div className="evento-page">
      <h1>Lista de Eventos</h1>

      <Search
        search={search}
        setSearch={setSearch}
        content={content}
        setContent={setContent}
      />
      <div className="evento-list">
        {eventos && eventos.map((evento) => (
          <Evento key={evento.id} evento={evento} />
        ))}
      </div>
    </div>
  );
}
