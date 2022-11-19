import "./map.style.css";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

export const Map = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  const [infoWindow, setInfoWindow] = useState();

  const getLocalization = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Você");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Erro: Geolocalização falhou, verifique as permissões do navegador."
        : "Erro: Seu navegador não suporta a geolocalização."
    );
    infoWindow.open(map);
  }

  useEffect(() => {
    const locationButton = document.getElementById("getPositionButton");
    setInfoWindow(new window.google.maps.InfoWindow());
    if (ref.current && !map) {
      const map = new window.google.maps.Map(ref.current, {
        streetViewControl: false 
      })
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      setMap(map);
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
      <button 
        id="getPositionButton"
        className="map__custom-map-control-button" 
        type="button"
        onClick={getLocalization}
      >
        Sua posição
      </button>
    </>
  );
};

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof window.google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof window.google.maps.LatLng
  ) {
    return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
  }
  return deepEqual(a, b);
});

const useDeepCompareMemoize = (value) => {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

const useDeepCompareEffectForMaps = (callback, dependencies) => {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
