import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import './style.css'

export default function TableEvent(props){

    return (
        <div>
            <Form inline onSubmit={props.handleSearch}>
                <FormControl titulo='search' type="text" placeholder="Buscar" className=" mr-sm-2" />
                <Button type="submit">Buscar</Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Titulo</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Data inicio</th>
                        <th scope="col">Data término</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.events.length ? 
                        props.events.map((event, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{event.titulo}</td>
                                    <td>{event.descricao}</td>
                                    <td>{event.latitude}</td>
                                    <td>{event.longitude}</td>
                                    <td>{event.dataInicio}</td>
                                    <td>{event.dataTermino}</td>
                                    <td>
                                        <button className="btn btn-warning" title='Editar' 
                                        onClick={
                                            () => props.update(
                                                event.id, 
                                                event.titulo, 
                                                event.descricao, 
                                                event.latitude,
                                                event.longitude,
                                                event.dataInicio,
                                                event.dataTermino
                                                )
                                        }>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' 
                                        onClick={() => props.remove(event.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        null
                    }
                </tbody>
            </Table>
        </div>
    )
}