import { useEffect, useState } from "react";
import { ContainerMap, LoadingCenter } from "./ContainerMap";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MagnifyingGlass } from "react-loader-spinner";
import Button from "../../components/Button";
import axios from "axios";

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

  useEffect(() => {
    const url = "http://localhost:4000/location";

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
            {markerPosition && markerPosition.map(el=><Marker position={{lat:el.latitude,lng:el.longitude}} options={{label:{
              text:el.name
            }}} cursor="pointer" />)}
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
        <Button/>
      </ContainerMap>
    </>
  );
}
