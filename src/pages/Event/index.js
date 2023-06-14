import axios from "axios";
import { useState, useEffect  } from "react";

import TableEvent from '../../components/TableEvent/tableEvent';
import './style.css';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';

import { NotificationManager } from 'react-notifications';

export default function EventsPage() {

    const [event, setEvent] = useState(false);
    const handleEvent = () => setEvent(false)
    
    const [eventUpdate, setEventUpdate] = useState(false)
    const handleEventClose = () => setEventUpdate(false)
    const handleEventUpdate = () => setEventUpdate(true) 

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataTermino, setDataTermino] = useState('')
    const [index, setIndex] = useState(null)
    const [listEvents, setListEvents] = useState({})

    function clearFields(){
        setTitulo('')
        setDescricao('')
        setLatitude('')
        setLongitude('')
        setDataInicio('')
        setDataTermino('')
    }

    const HandleTitulo = (e) => {
        setTitulo(e.target.value)
    }
    
    const HandleDescricao = (e) => {
        setDescricao(e.target.value)
    }
    
    const HandleLatitude = (e) => {
        setLatitude(e.target.value)
    }

    const HandleLongitude = (e) => {
        setLongitude(e.target.value)
    }

    const HandleDataInicio = (e) => {
        setDataInicio(e.target.value)
    }

    const HandleDataTermino = (e) => {
        setDataTermino(e.target.value)
    }

    const remove = (index) => {
        axios.post(`event/${index}`)
        .then(()=>{
            NotificationManager.success('Excluido', 'Excluido')
            loadList()
        })
        .catch(error=>{
            NotificationManager.warning('Erro', error)
        })
    }

    const edit = (index, titulo, descricao, latitude, longitude, dataInicio, dataTermino) => {
        setTitulo(titulo)
        setDescricao(descricao)
        setLatitude(latitude)
        setLongitude(longitude)
        setDataInicio(dataInicio)
        setDataTermino(dataTermino)
        setIndex(index)
        handleEventClose()
    }
    
    const update = (e) => {
        e.preventDefault()
        if(titulo == '' || descricao == ''  || latitude == '' || longitude == '' || dataInicio == '' || dataTermino == '')
            NotificationManager.warning('Erro', "Campos não preenchidos")
        else{
            const event = {
                titulo: titulo,
                descricao: descricao,
                latitude: latitude,
                longitude: longitude,
                dataInicio: dataInicio,
                dataTermino: dataTermino,
            }

            axios.post(`event/${index}`, event)
            .then(()=>{
                loadList()
            })
            .catch(error=>{
                NotificationManager.warning('Erro', error)
            })
            handleEventClose()
        }
    }
    
    function loadList(){
        axios.get("event/")
        .then(list => {
            setListEvents(list.data)
        })
        .catch(error=>{
            NotificationManager.warning('Erro', error)
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(titulo == '' || descricao == ''  || latitude == '' || longitude == '' || dataInicio == '' || dataTermino == '')
            NotificationManager.warning('Erro', "Campos não preenchidos")
        else{
            const event = {
                titulo: titulo,
                descricao: descricao,
                latitude: latitude,
                longitude: longitude,
                dataInicio: dataInicio,
                dataTermino: dataTermino
            }

            axios.post("event/",event)
            .then((event)=>{
                const newEvent = event.data
                setListEvents([...listEvents, newEvent])
                NotificationManager.success('Adicionado', "Adicionado com sucesso")
            })
            .catch(error=>{
                NotificationManager.warning('Erro', error)
            })
            handleEvent()
            clearFields()
        }
    }

    const handleSearch  = (e) => {
        e.preventDefault()
        const titulo = e.target.search.value

        if (titulo != ""){
            axios.get(`event/?titulo=${titulo}`)
            .then((events) => {
                setListEvents(events.data)
                console.log(listEvents)
            })
            .catch(error=>{
                NotificationManager.warning('Erro', error)
            })
        }else
            loadList()
    }

    useEffect(()=>{
        loadList()
    },[])

    return (
        <div>
            <h1>Lista de Eventos</h1>
            <div classtitulo='divHeader'>
                <Button variant="primary" onClick={handleEvent}>
                    Cadastrar
                </Button>
            </div>

            <TableEvent handleSearch={handleSearch} editar={edit} excluir={remove} events={listEvents}/>

            {/* Modal Adicionar */}
            <Modal event={event} onHide={handleEvent}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Título:</Form.Label>
                            <Form.Control type="text" placeholder="Titulo" onChange={HandleTitulo}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDescricao">
                            <Form.Label>Descrição:</Form.Label>
                            <Form.Control type="text" placeholder="Descrição" onChange={HandleDescricao}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLatitude">
                            <Form.Label>Latitude:</Form.Label>
                            <Form.Control type="text" placeholder="Latitude" onChange={HandleLatitude}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLongitude">
                            <Form.Label>Longitude:</Form.Label>
                            <Form.Control type="text" placeholder="Longitude" onChange={HandleLongitude}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDataInicio">
                            <Form.Label>Data de início:</Form.Label>
                            <Form.Control type="text" onChange={HandleDataInicio}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDataTermino">
                            <Form.Label>Data de término:</Form.Label>
                            <Form.Control type="text" onChange={HandleDataTermino}/>
                        </Form.Group>
        
                        <Button variant="secondary" onClick={handleEvent}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Cadastrar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        
            {/* Modal Editar */}
            <Modal event={eventUpdate} onHide={handleEventClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={update}>
                        <Form.Group>
                            <Form.Label>Título:</Form.Label>
                            <Form.Control type="text" placeholder="Titulo" onChange={HandleTitulo} value={titulo}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDescricao">
                            <Form.Label>Descrição:</Form.Label>
                            <Form.Control type="text" placeholder="Descrição" onChange={HandleDescricao} value={descricao}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLatitude">
                            <Form.Label>Latitude:</Form.Label>
                            <Form.Control type="text" placeholder="Latitude" onChange={HandleLatitude} value={latitude}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLongitude">
                            <Form.Label>Longitude:</Form.Label>
                            <Form.Control type="text" placeholder="Longitude" onChange={HandleLongitude} value={longitude}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDataInicio">
                            <Form.Label>Data de início:</Form.Label>
                            <Form.Control type="text" onChange={HandleDataInicio} value={setDataInicio}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDataTermino">
                            <Form.Label>Data de término:</Form.Label>
                            <Form.Control type="text" onChange={HandleDataTermino} value={setDataTermino}/>
                        </Form.Group>
                        
                        <Button variant="secondary" onClick={handleEventClose}>
                            Remover
                        </Button>
                        <Button variant="primary" type='submit'>
                            Atualizar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
   
}
