import { useEffect, useState } from "react";
import React from "react";
import { ContainerMap, LoadingCenter } from "./ContainerMap";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MagnifyingGlass } from "react-loader-spinner";
import Button from "../../components/Button";
import axios from "axios";
import styled from "styled-components";
import { XCircle, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -6.888463202449027,
  lng: -38.558930105104125,
};

export default function LocationsPage() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [saveId, setSaveId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const navigate = useNavigate();

  function handleLocation(el) {
    setSaveId(el._id);
    setTitulo(el.titulo);
    setDescricao(el.descricao);
    setDataInicio(el.dataInicio.slice(0, 10));
    setDataTermino(el.dataTermino.slice(0, 10));
    setLatitude(el.latitude);
    setLongitude(el.longitude);
    setClicked(true);
  }

  useEffect(() => {
    const url = "http://localhost:4000/event";

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setMarkerPosition(res.data);
      })
      .catch((erro) => console.log(erro.res.message));
  }, [refresh]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyATNeUM7feB5kgq-MQlioYJO83sQOx1OY4",
  });

  const deleteLocation = () => {
    const url = `http://localhost:4000/event/${saveId}`;
    axios.delete(url).then((res) => {
      setClicked(false);
      setRefresh(!refresh);
      console.log(res.data);
    });
  };
  return (
    <>
      <ContainerMap>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
          >
            {markerPosition &&
              markerPosition.map((el) => (
                <Marker
                  onClick={() => handleLocation(el)}
                  position={{ lat: el.latitude, lng: el.longitude }}
                  options={{
                    label: {
                      text: el.titulo,
                    },
                  }}
                  cursor="pointer"
                />
              ))}
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
        <Button />
      </ContainerMap>
      <ModalBox clicked={clicked ? "flex" : "none"}>
        <header>
          <XCircle onClick={() => setClicked(!clicked)} />
        </header>
        <main>
          <h1>Titulo: {titulo}</h1>
          <h2>Descrição: {descricao}</h2>
          <h2>Data Inicio: {dataInicio}</h2>
          <h2>Data Termino: {dataTermino}</h2>
        </main>
        <footer>
          <Edit
            color="grey"
            onClick={() =>
              navigate("/update", {
                state: {
                  id: saveId,
                  titulo,
                  descricao,
                  dataInicio,
                  dataTermino,
                  latitude,
                  longitude,
                },
              })
            }
          />
          <Trash2 color="red" onClick={deleteLocation} />
        </footer>
      </ModalBox>
    </>
  );
}

const ModalBox = styled.div`
  display: ${(props) => props.clicked};
  flex-direction: column;
  position: absolute;
  width: 250px;
  z-index: 2;
  height: auto;
  background-color: white;
  box-shadow: 1px 1px 1px gray;
  border-radius: 10px;
  top: calc(45%);
  left: calc(45%);

  header {
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: flex-end;
  }
  main {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
  }
  footer {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-around;
  }
`;
