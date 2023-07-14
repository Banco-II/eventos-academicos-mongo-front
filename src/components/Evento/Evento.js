const Evento = ({ evento }) => {
  return (
    <div className="evento">
      <div className="content">
        <p>Titulo: {evento.titulo}</p>
        <p className="descricao">Descrição: {evento.descricao}</p>
        <p className="dataInicio">Data de Inicio: {evento.dataInicio.slice(0,10)}</p>
        <p className="dataTermino">Data de Término: {evento.dataTermino.slice(0,10)}</p>
      </div>
      <div>
        <button className="participar">Participar</button>
      </div>
    </div>
  );
};

export default Evento;
