import { useState, useEffect } from "react";
import Evento from "../../components/Evento/Evento";
import Search from "../../components/Search/Search";
import axios from "axios";

import './style.css'

export default function SearchLocation() {
const [content, setContent] = useState()

const url = "http://localhost:4000/event";
const [eventos, setEventos] = useState([
      {
      id:1,
      titulo: "Primeiro evento",
      descricao: "Estudo",
      dataInicio: '01/02/2024',
      dataTermino: '04/02/2024',
      },
      {
      id:2,
      titulo: "Segundo evento",
      descricao: "Estudo",
      dataInicio: '01/02/2024',
      dataTermino: '04/02/2024',
      isComplete: false,
      },
      {
      id:3,
      titulo: "Terceiro evento",
      descricao: "Estudo",
      dataInicio: '01/02/2024',
      dataTermino: '04/02/2024',
      isComplete: false,
      }
      ])

    const [search, setSearch] = useState("");

    const searchLowerCase = search.toLowerCase()

    const filtroEvento = eventos.filter((e) => e.titulo.toLowerCase().includes(searchLowerCase))
    return (
        <div className="evento-page">
        <h1>Lista de Eventos</h1>

        <Search search={search} setSearch={setSearch}/>
        <div className="evento-list">
        {filtroEvento.map((evento) => (
        <Evento 
        key={evento.id} 
        evento={evento}
        />
        ))}
        </div>
        </div>
        )
}