import { useState } from "react";
import { Form } from "../../components/Forms/Form";
import { Container } from "./style";
import { ContainerMap, LoadingCenter } from "../../components/Maps/Map";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MagnifyingGlass } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -6.888463202449027,
  lng: -38.558930105104125,
};

export default function HomePage() {
  const [form, setForm] = useState({ titulo: "", descricao: "" });
  const [markerPosition, setMarkerPosition] = useState(null);

  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function createEvent(e) {
    e.preventDefault();

    if (markerPosition === null) {
      alert("Informe o ponto onde irá ocorrer o evento");
      return;
    }
    const url = "http://localhost:4000/location";

    axios
      .post(url, {
        titulo: form.titulo,
        descricao: form.descricao,
        latitude: markerPosition.lat,
        longitude: markerPosition.lng,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/locations");
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data);
      });
  }

  const handleMapClick = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyATNeUM7feB5kgq-MQlioYJO83sQOx1OY4",
  });

  return (
    <>
      <Container>
        <Form onSubmit={createEvent}>
          <h1>
            Cria novo
            <br /> Evento
          </h1>
          <label htmlFor="titulo">Titulo</label>
          <input
            id="titulo"
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleForm}
            required
            placeholder="Type the event title"
          />
          <label htmlFor="descricao">Descrição</label>
          <input
            id="descricao"
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleForm}
            required
            placeholder="Describe the event"
          />
          <label htmlFor="titulo">Data de Início</label>
          <input
            id="descricao"
            type="date"
            name="descricao"
            value={form.descricao}
            onChange={handleForm}
            required
            placeholder="Describe the event"
          />
          <label htmlFor="titulo">Data de Termino</label>
          <input
            id="descricao"
            type="date"
            name="descricao"
            value={form.descricao}
            onChange={handleForm}
            required
            placeholder="Describe the event"
          />
          <button type="submit">criar evento</button>
        </Form>
        <ContainerMap>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
              onClick={handleMapClick}
            >
              {markerPosition && (
                <Marker position={markerPosition} cursor="pointer" />
              )}
            </GoogleMap>
          ) : (
            <LoadingCenter>
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#000"
              />
            </LoadingCenter>
          )}
        </ContainerMap>
      </Container>
    </>
  );
}
