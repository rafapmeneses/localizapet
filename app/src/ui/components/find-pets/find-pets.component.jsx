import "./find-pets.style.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePetApi } from "../../../hooks";
import { Card } from "../../components"
import { Input } from "../input/input.component";

export const FindPets = ({showComponent}) =>{
  const [pets, setPets] = useState([]);
  const usePetLocalizapetApi = usePetApi();
  const navigate = useNavigate();

  const updatePets = useCallback(async () => {
    try {
      const {data} = await usePetLocalizapetApi.getPets();
      setPets(data);
    } catch (error) {
      throw error;
    }
  }, [usePetLocalizapetApi]);

  useEffect(()=>{
    updatePets();
  },[updatePets]);

  const handleChange = async (evento) => {
    const { name, value } = evento.target;
    const {data} = await usePetLocalizapetApi.getPetsByName(value);
    setPets(data);
  };

  const onClickGoToPet = (id) => {
    navigate(`/pet/${id}`)
  }

  return (
    <div className={`find-pets__content ${showComponent ? "find-pets__show" : ""}`}>
      <div className="find-pets__container">
        <h3>Meus Animais</h3>
        <Input 
          larguraCompleta
          name={"inputToFind"}
          onChange={handleChange}
          placeholder={"Pesquisar"}
        />

        <div className="find-pets__cards">
          {pets?.map((pet)=>(
            <Card key={pet.id} info={pet} onClick={onClickGoToPet}/>
          ))}
        </div>

      </div>
    </div>
  )
}