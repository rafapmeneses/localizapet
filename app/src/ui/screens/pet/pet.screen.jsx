import "./pet.style.css";
import { Botao, Input, InputCheckbox, LabelInfo, RenderMap, Sidebar, InputSelect } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { usePetApi, useUserApi, useMarkerApi} from "../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import DOG_RACES from "../../../constants/dogRaces.json";
import CAT_RACES from "../../../constants/catRaces.json";
import photoDefault from "../../../assets/img/photo-default.svg";

const INITIAL_FORM = {
  id: "",
  userId:"",
  name: "",
  type: "DOG",
  race: "ANOTHER",
  photo: "",
  description: ""
};

const INITIAL_MARKER = {
  lat:"",
  lng:"",
  type: "PET_ADOPTION"
};

const PET_STATUS = {
  LOST: "LOST",
  PET_ADOPTION: "PET_ADOPTION"
}

const PET_TYPE = {
  DOG: "Cachorro",
  CAT: "Gato",
}

const INITIAL_OWNER = {
  id:"",
  name:"",
  email:"",
  phoneNumber:"",
};

export const Pet = () => {
  const [pet, setPet] = useState(INITIAL_FORM);
  const [owner, setOwner] = useState(INITIAL_OWNER);
  const [marker, setMarker] = useState(INITIAL_MARKER);
  const [user, setUser] = useState("");
  const [click, setClick] = useState({});
  const [editPet, setEditPet] = useState(false);
  const usePetLocalizapetApi = usePetApi();
  const useUserLocalizapetApi = useUserApi();
  const useMarkerLocalizapetApi = useMarkerApi();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const updatePets = useCallback(async () => {
    try {
      const petId = pathname.replace("/pet/", "");
      const { data } = await usePetLocalizapetApi.getPet(petId);
      const { data: ownerData  } = await useUserLocalizapetApi.getUser(data.userId);
      setPet(data);
      setOwner(ownerData);
    } catch (error) {
      throw error;
    }
  }, [usePetLocalizapetApi, useUserLocalizapetApi, pathname]);

  const updateUser = useCallback(async () => {
    try {
      const { data } = await useUserLocalizapetApi.getLoggedUser();
      setUser(data.id);
    } catch (error) {
      throw error;
    }
  }, [useUserLocalizapetApi, pathname]);

  const updateMarker = useCallback(async () => {
    try {
      const petId = pathname.replace("/pet/", "");
      const { data } = await useMarkerLocalizapetApi.getMarker(petId);
      const {id, lat, lng, ownerId, title } = data;
      setClick({
        id,
        position: new window.google.maps.LatLng(lat, lng),
        ownerId,
        title
      })
      setMarker(data);
    } catch (error) {
      throw error;
    }
  }, [useMarkerLocalizapetApi, pathname]);

  useEffect(()=>{
    updatePets();
    updateUser();
    updateMarker();
  },[updatePets, updateUser, updateMarker]);

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    setPet((oldValues) => {
      return {
        ...oldValues,
        [name]: value,
      };
    });
  };

  const handleChangeMarkerType = (event) => {
    const { value } = event.target;
    setMarker((oldValues) => {
      return {
        lat: oldValues?.lat,
        lng: oldValues?.lng,
        type: value
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
    setMarker((oldValue) => {
      return {
        lat,
        lng,
        type: oldValue?.type
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setClick({});
    try {
      const body = {
        name: pet?.name,
        description: pet?.description,
        photo: pet?.photo,
        race: pet?.race,
        type: pet?.type,
        marker: {
          lat: marker?.lat,
          lng: marker?.lng,
          type: marker?.type
        }
      }
      await usePetLocalizapetApi.putPet(pet.id, body);
      // navigate("/")
    } catch (error) {
      throw error
    }
  }

  const formToEditPet = (
    <form className="pet__form" onSubmit={handleSubmit}>
      <Input
        label="Foto"
        type={"file"}
        value={pet?.photo}
        onChange={handleChange}
        name="photo"
        larguraCompleta
        isRow
      />
      <Input
        label="Nome do pet"
        value={pet?.name}
        onChange={handleChange}
        name="name"
        larguraCompleta
        isRow
      />
      <Input
        label="Descrição"
        value={pet?.description}
        onChange={handleChange}
        name="description"
        larguraCompleta
        isRow
      />
      <InputSelect 
        label="Tipo"
        value={pet?.type}
        onChange={handleChange}
        name="type"
        larguraCompleta
        list={PET_TYPE}
        isRow
      />
      <InputSelect 
        label="Raça"
        value={pet?.race}
        onChange={handleChange}
        name="race"
        larguraCompleta
        list={pet?.type === "DOG" ? DOG_RACES : CAT_RACES}
        isRow
      />
      <InputCheckbox
        id={"switch_lost"}
        type="radio"
        label="Perdido?"
        value={PET_STATUS.LOST}
        onChange={handleChangeMarkerType}
        name="status"
        checked={marker?.type===PET_STATUS.LOST}
      />
      <InputCheckbox
        id={"switch_adoption"}
        type="radio"
        label="Adoção?"
        value={PET_STATUS.PET_ADOPTION}
        onChange={handleChangeMarkerType}
        name="status"
        checked={marker?.type===PET_STATUS.PET_ADOPTION}
      />
      {
        marker?.type===PET_STATUS.LOST
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
      <Botao className="pet__botao">
        Atualizar pet
      </Botao>
    </form>
  )

  const petInformations = (
    <>
      <div className="pet__info">
        <div className="pet__info-header">
          <div className="pet__info-header-img">
            <img 
              src={pet?.photo!=="" && pet?.photo!==null ? pet?.photo : photoDefault}  
              alt={`Foto de ${pet?.name}`} 
            />
          </div>
          <p className="pet__info-header-name">{pet?.name}</p>
        </div>
        <LabelInfo label={"Tipo"} info={pet?.type} isType/>
        <LabelInfo label={"Raça"} info={pet?.race} raceType={pet?.type}/>
        <LabelInfo label={"Descrição"} info={pet?.description}/>
        <LabelInfo label={"Responsável"} info={owner?.name}/>
        <LabelInfo label={"Email"} info={owner?.email}/>
        <LabelInfo label={"Número"} info={owner?.phoneNumber}/>
        {
          pet?.situation === "LOST"
          ?
          <p className="pet__info-situation-lost">{pet?.name} está desaparecido!</p>
          :
          <p className="pet__info-situation-adoption">{pet?.name} a procura de um responsável!</p>
        }
      </div>
    </>
  )

  return (
    <div className="pet__content" >
      <Sidebar></Sidebar>
      <div className="pet__container">
        {
          editPet
          ?
          formToEditPet
          :
          user === pet?.userId && petInformations
        }
        {
          user !== pet?.userId &&
          petInformations
        }
        {
          user === pet?.userId &&
          <InputCheckbox
            id={"checkbox"}
            type="checkbox"
            label="Editar"
            onChange={()=>{setEditPet(!editPet)}}
            name="editPet"
            className={"pet__editPet"}
            labelClassName={"pet__editPet-label"}
            checked={editPet}
          />
        }
      </div>
    </div>
  );
};
