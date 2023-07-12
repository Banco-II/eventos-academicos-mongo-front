import { useState } from "react";
import Evento from "../../components/Evento/Evento";
import Search from "../../components/Search/Search";
import './style.css';

export default function SearchLocation() {
    const [eventos, setEventos] = useState([
      {
        id:1,
        text: "Primeiro evento",
        category: "Estudo",
        isComplete: false,
      },
      {
        id:2,
        text: "Segundo evento",
        category: "Estudo",
        isComplete: false,
      },
      {
        id:3,
        text: "Terceiro evento",
        category: "Estudo",
        isComplete: false,
      }
    ])

    const [search, setSearch] = useState("");

    const searchLowerCase = search.toLowerCase()

    const filtroEvento = eventos.filter((e) => e.text.toLowerCase().includes(searchLowerCase))
    
    return (
        <div className="app">
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
   /* const [busca, setBusca] = useState({conteudo: ""});

    const [data, setData] = useState();

    function handleBusca(e) {
        setBusca({ ...busca, [e.target.name]: e.target.value });
      }
    
    useEffect(() => {
      const url = `http://localhost:4000/event/${busca}`;
      
      axios.get(url)
           .then((res) => {
             console.log(res.data)
             setData(res.data)
           }) 
           .catch((err) => {
            console.log("Ocorreu um erro: " + err);
           })  
    })

    return (
        <>
         <div className="container">
           <h1>Buscar Evento</h1>
    
           <form>
              <input 
              type="text" 
              placeholder="Buscar evento" 
              className="busca"
              name="conteudo"
              value={busca.conteudo}
              onChange={handleBusca}
              />
 
           </form>
         </div>
        </>
    )*/
}