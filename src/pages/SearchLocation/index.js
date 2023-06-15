import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchLocation() {
    const [busca, setBusca] = useState({conteudo: ""});
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
    )
}