import { useEffect, useState } from "react";
import React from "react";
import { ContainerMap, LoadingCenter } from "./ContainerMap";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MagnifyingGlass } from "react-loader-spinner";
import Button from "../../components/Button";
import axios from "axios";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    return (
      <>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </>
    );
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleLocation(key) {
    alert(key);
  }

  useEffect(() => {
    const url = "http://localhost:4000/eventos";

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setMarkerPosition(res.data);
      })
      .catch((erro) => console.log(erro.res.message));
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyATNeUM7feB5kgq-MQlioYJO83sQOx1OY4",
  });

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
                  onClick={() => {
                    openModal();
                    setIsOpen(true);
                  }}
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
    </>
  );
}
