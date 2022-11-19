import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useState } from "react";
import { Map, Marker } from '../../components';

const GOOGLE_MAPS_TOKEN = process.env.REACT_APP_GOOGLE_MAPS_TOKEN || "";

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

export const RenderMap = ({markers, marker, onClick, onClickGoTo, isHome}) => {
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState({
    lat: -29.6984599,
    lng: -53.8525509,
  });
  const borderInMap = isHome ? "" : "4%";

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  return (
    <Wrapper apiKey={GOOGLE_MAPS_TOKEN} render={render}>
      <Map
        center={center}
        onClick={onClick}
        onIdle={onIdle}
        zoom={zoom}
        style={{ flexGrow: "1", height: "100%", borderRadius: borderInMap, width: "100%"}}
      >
        {markers?.length && markers.map(({id, position, ownerId, type, title}) => (
          <Marker 
            key={id} 
            position={position} 
            ownerId={ownerId} 
            type={type} 
            title={title} 
            onClickGoTo={onClickGoTo}
          />
        ))}
        <Marker 
          position={marker?.position} 
          ownerId={marker?.ownerId} 
          type={marker?.type} 
          title={marker?.title}
          temporaryMarker 
        />
      </Map>
    </Wrapper>
  );
};
