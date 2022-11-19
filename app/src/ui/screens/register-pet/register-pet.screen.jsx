import "./register-pet.style.css";
import { Botao, Input, RenderMap, Sidebar, InputCheckbox, InputSelect } from "../../components";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { usePetApi } from "../../../hooks";
import DOG_RACES from "../../../constants/dogRaces.json";

const INITIAL_FORM = {
  name: "",
  marker:{
    lat:"",
    lng:"",
    type: "PET_ADOPTION"
  },
  type: "DOG",
  race: "ANOTHER",
  photo: "",
  description: ""
};

const PET_STATUS = {
  LOST: "LOST",
  PET_ADOPTION: "PET_ADOPTION"
}

const CAT_RACES = {
  ANOTHER: "Outro"
}

const PET_TYPE = {
  DOG: "Cachorro",
  CAT: "Gato"
}

export const RegisterPet = () => {
  const [click, setClick] = useState({});
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const navigate = useNavigate();
  const usePetLocalizapetApi = usePetApi();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((oldValue) => {
      return {
        ...oldValue,
        [name]: value,
      };
    });
  };

  const handleChangeMarkerType = (event) => {
    const { value } = event.target;
    setFormValues((oldValue) => {
      return {
        ...oldValue,
        marker:{
          lat: oldValue?.marker.lat,
          lng: oldValue?.marker.lng,
          type: value
        }
      };
    });
  };

  const onClickSetLatLng = (event) => {
    setClick((oldValues) => {
      return {
        ...oldValues,
        position: event.latLng
      };
    })
    const {lat, lng} = event.latLng.toJSON()
    setFormValues((oldValue) => {
      return {
        ...oldValue,
        marker:{
          lat,
          lng,
          type: oldValue?.marker.type
        }
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setClick({})
    try{
      await usePetLocalizapetApi.postPet(formValues)
      navigate(0);
    }
    catch(error){
      throw error;
    }
  }

  return (
    <div className="register-pet__content">
      <Sidebar></Sidebar>
      <div className="register-pet__container">
        <form className="register-pet__form" onSubmit={handleSubmit}>
          <Input
            label="Foto"
            type={"file"}
            value={formValues.photo}
            onChange={handleChange}
            name="photo"
            larguraCompleta
            isRow
          />
          <Input
            label="Nome do pet"
            value={formValues.name}
            onChange={handleChange}
            name="name"
            larguraCompleta
            required
            isRow
          />
          <Input
            label="Descrição"
            value={formValues.description}
            onChange={handleChange}
            name="description"
            larguraCompleta
            isRow
          />
          <InputSelect 
            label="Tipo"
            value={formValues.type}
            onChange={handleChange}
            name="type"
            larguraCompleta
            list={PET_TYPE}
            isRow
          />
          <InputSelect 
            label="Raça"
            value={formValues.race}
            onChange={handleChange}
            name="race"
            larguraCompleta
            list={formValues.type === "DOG" ? DOG_RACES : CAT_RACES}
            isRow
          />
          <InputCheckbox
            id={"switch_lost"}
            type="radio"
            label="Perdido?"
            value={PET_STATUS.LOST}
            onChange={handleChangeMarkerType}
            name="situation"
            checked={formValues.marker.type===PET_STATUS.LOST}
          />
          <InputCheckbox
            id={"switch_adoption"}
            type="radio"
            label="Adoção?"
            value={PET_STATUS.PET_ADOPTION}
            onChange={handleChangeMarkerType}
            name="situation"
            checked={formValues.marker.type===PET_STATUS.PET_ADOPTION}
          />
          {
            formValues?.marker.type===PET_STATUS.LOST
            ?
            <p 
              className="register-pet__map-label-lost"
            >
              Selecione o local que o pet foi visto por último
            </p>
            :
            <p 
              className="register-pet__map-label-adoption"
            >
              Selecione o local que o pet está
            </p>
          }
          <div className="register-pet__map">
            <RenderMap
              onClick={onClickSetLatLng}
              marker={click}
            />
          </div>
          <Botao 
            className="register-pet__botao" 
            larguraCompleta
            desabilitado={formValues.marker.lat==="" && formValues.marker.lng===""}
          >
            Cadastrar Pet
          </Botao>
        </form>
      </div>
    </div>
  );
};
