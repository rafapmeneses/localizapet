import "./label-info.style.css";
import DOG_RACES from "../../../constants/dogRaces.json";
import CAT_RACES from "../../../constants/catRaces.json";
import { useEffect, useState } from "react";

const PET_TYPE = {
  DOG: "Cachorro",
  CAT: "Gato",
}

export const LabelInfo = ({name, label, info, id, isType, raceType}) => {
  const [race, setRace] = useState("");

  useEffect(()=>{
    if(raceType==="DOG"){
      setRace(DOG_RACES[info])
    }
    else{
      setRace(CAT_RACES[info])
    }
  },[])

  return (
    <div className={`label-info__content`}>
      <div className={`label-info__box`}>
        <label className="label-info__label" htmlFor={name}>
          {label}:
        </label>
        <p className={"label-info__info"} htmlFor={id}> 
          {
            isType &&
            PET_TYPE[info]
          }
          {
            raceType &&
            race
          }
          {
            !isType && !raceType
            && 
            info
          }
        </p>
      </div>
      <div className="label-info__line"></div>
    </div>
  );
};

LabelInfo.defaultProps = {
};
