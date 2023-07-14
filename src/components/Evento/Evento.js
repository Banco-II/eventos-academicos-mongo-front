const Evento = ({ evento }) => {

  return (
  <div className="evento">
  <div className="content">
  <p>{evento.titulo}</p>
  <p className="descricao">{evento.descricao}</p>
  <p className="dataInicio">{evento.dataInicio}</p>
  <p className="dataTermino">{evento.dataTermino}</p>
  </div>
  <div>
  <button className='participar'>Participar</button>
  </div>
  </div>
  )
  }
  
  export default Evento
  