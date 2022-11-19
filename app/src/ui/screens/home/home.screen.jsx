import "./home.style.css";
import { useCallback, useState, useEffect } from "react";
import { RenderMap, Sidebar } from '../../components';
import { useMarkerApi } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const INITIAL_FILTER = {
  typeInMap: "",
  title: "",
  owner: false
}

export const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const useMarkerLocalizapetApi = useMarkerApi();
  const navigate = useNavigate();

  const updateMarkers = useCallback(async () => {
    try {
      const { data } = await useMarkerLocalizapetApi.getMarkers(filter);
      const markers = data.map(
        ({id, lat, lng, type, ownerId, title}) => {
          return {
            id,
            position: new window.google.maps.LatLng(lat, lng),
            type,
            ownerId,
            title
          }
        }
      )
      setMarkers(markers);
    } catch (error) {
      throw error;
    }

  }, [useMarkerLocalizapetApi]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const { data } = await useMarkerLocalizapetApi.getMarkers(filter);
        const markers = data.map(
          ({id, lat, lng, type, ownerId, title}) => {
            return {
              id,
              position: new window.google.maps.LatLng(lat, lng),
              type,
              ownerId,
              title
            }
          }
        )
        setMarkers(markers);
      } catch (error) {
        throw error;
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [filter]);

  useEffect(()=>{
    updateMarkers();
  },[updateMarkers]);

  const handleChangeFilter = (name, value) => {
    setFilter((oldValue) => {
      return {
        ...oldValue,
        [name]: value,
      };
    });
  }

  const onClickGoTo = (id, type) => {
    if(type==="INSTITUTION"){
      navigate(`/instituicao/${id}`)
    }
    else{
      navigate(`/pet/${id}`)
    }
  };

  const clearFilter = () => {
    setFilter(INITIAL_FILTER)
  };

  return (
    <div className="home__content" >
      <Sidebar handleChangeFilter={handleChangeFilter} clearFilter={clearFilter}/>
      <RenderMap 
        isHome={true}
        markers={markers} 
        onClickGoTo={onClickGoTo}
      />
    </div>
  );
};
