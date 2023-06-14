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

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [data, setData] = useState('')
    const [index, setIndex] = useState(null)
    const [listEvents, setListEvents] = useState({})

    function clearFields(){
        setName('')
        setDescription('')
        setLatitude('')
        setLongitude('')
        setData('')
    }

    const HandleName = (e) => {
        setName(e.target.value)
    }
    
    const HandleDescription = (e) => {
        setDescription(e.target.value)
    }
    
    const HandleLatitude = (e) => {
        setLatitude(e.target.value)
    }

    const HandleLongitude = (e) => {
        setLongitude(e.target.value)
    }

    const HandleData = (e) => {
        setData(e.target.value)
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

    const edit = (index, name, description, latitude, longitude, data) => {
        setName(name)
        setDescription(description)
        setLatitude(latitude)
        setLongitude(longitude)
        setData(data)
        setIndex(index)
        handleEventClose()
    }
    
    const update = (e) => {
        e.preventDefault()
        if(name == '' || description == ''  || latitude == '' || longitude == '' || data== '')
            NotificationManager.warning('Erro', "Campos não preenchidos")
        else{
            const event = {
                name: name,
                description: description,
                latitude: latitude,
                longitude: longitude,
                data: data,
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

        if(name == '' || description == ''  || latitude == '' || longitude == '' || data== '')
            NotificationManager.warning('Erro', "Campos não preenchidos")
        else{
            const event = {
                name: name,
                description: description,
                latitude: latitude,
                longitude: longitude,
                data: data
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
        const name = e.target.search.value

        if (name != ""){
            axios.get(`event/?name=${name}`)
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
            <div className='divHeader'>
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
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control type="text" placeholder="Nome" onChange={HandleName}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Descrição:</Form.Label>
                            <Form.Control type="text" placeholder="Descrição" onChange={HandleDescription}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLatitude">
                            <Form.Label>Latitude:</Form.Label>
                            <Form.Control type="text" placeholder="Latitude" onChange={HandleLatitude}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLongitude">
                            <Form.Label>Longitude:</Form.Label>
                            <Form.Control type="text" placeholder="Longitude" onChange={HandleLongitude}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicData">
                            <Form.Label>Data do evento:</Form.Label>
                            <Form.Control type="text" onChange={HandleData}/>
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
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control type="text" placeholder="Nome" onChange={HandleName} value={name}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Descrição:</Form.Label>
                            <Form.Control type="text" placeholder="Descrição" onChange={HandleDescription} value={description}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLatitude">
                            <Form.Label>Latitude:</Form.Label>
                            <Form.Control type="text" placeholder="Latitude" onChange={HandleLatitude} value={latitude}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLongitude">
                            <Form.Label>Longitude:</Form.Label>
                            <Form.Control type="text" placeholder="Longitude" onChange={HandleLongitude} value={longitude}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicData">
                            <Form.Label>Data:</Form.Label>
                            <Form.Control type="text" onChange={HandleData} value={data}/>
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
