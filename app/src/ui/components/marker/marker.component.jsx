import { useEffect, useState } from "react";
import lostPet from '../../../assets/img/lost-pet.svg';
import institution from '../../../assets/img/institution.svg';
import petAdoption from '../../../assets/img/pet-adoption.svg';
import defaultPin from '../../../assets/img/defaultPin.svg';

export const Marker = (options) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    var icon = defaultPin;
    if(options.type==="PET_ADOPTION"){
      icon = petAdoption
    }
    else if(options.type==="LOST"){
      icon = lostPet
    }
    else if(options.type==="INSTITUTION"){
      icon = institution
    }

    if (!marker) {
      setMarker(new window.google.maps.Marker({
        title:options.title,
        animation: window.google.maps.Animation.DROP,
        icon: icon
      }));
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(()=>{
    if (marker && options?.position?.lat) {
      marker.setOptions(options);
    }
  },[marker, options])

  useEffect(()=>{
    if (marker) {
      marker.addListener("click", () => options.onClickGoTo(options?.ownerId, options?.type))
    }
  },[marker])
 
  return null;
};