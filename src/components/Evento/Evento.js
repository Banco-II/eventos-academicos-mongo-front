const Evento = ({ evento }) => {

  return (
    <div className="evento">
              <div className="content">
                <p>{evento.text}</p>
                <p className="category">{evento.category}</p>
              </div>
              <div>
                <button className='participar'>Participar</button>
              </div>
            </div>
  )
}

export default Evento