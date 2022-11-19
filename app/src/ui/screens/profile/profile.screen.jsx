import "./profile.style.css";
import { Sidebar, Input, Botao, RenderMap, InputCheckbox } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { useUserApi, useMarkerApi } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import photoDefault from "../../../assets/img/photo-default.svg";

const INITIAL_FORM = {
  username:"",
  name:"",
  email:"",
  bio:"",
  photo:"",
  phoneNumber:"",
  pixKey:"",
  needDonation: null,
  roles:[],
  marker: {
    lat: "",
    lng: "",
    type: ""
  }
};

export const Profile = () => {
  const [profile, setProfile] = useState(INITIAL_FORM);
  const [isInstitution, setIsInstitution] = useState(false);
  const [click, setClick] = useState({});
  const useUserLocalizapetApi = useUserApi();
  const useMarkerLocalizapetApi = useMarkerApi();
  const navigate = useNavigate();

  const updateUser = useCallback(async () => {
    try {
      const { data } = await useUserLocalizapetApi.getLoggedUser();
      const roleInstitution = data.roles.some(role=>role==="ROLE_INSTITUTION");
      setIsInstitution(roleInstitution);
      setProfile(data);
      if(roleInstitution){
        const marker = await useMarkerLocalizapetApi.getMarker(data.id);
        const {id, lat, lng, type, ownerId, title} = marker.data
        setClick({
          id,
          position: new window.google.maps.LatLng(lat, lng),
          ownerId,
          title
        })
      }
    } catch (error) {
      throw error;
    }
  }, [useUserLocalizapetApi, useMarkerLocalizapetApi]);

  useEffect(()=>{
    updateUser();
  },[updateUser]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setProfile((oldValues) => {
      if(name==="needDonation"){
        return {
          ...oldValues,
          [name]: checked,
        };
      }
      else{
        return {
          ...oldValues,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setClick({});
    try {
      await useUserLocalizapetApi.putUser(profile);
      navigate("/")
    } catch (error) {
      throw error
    }
  }

  const onClickSetLatLng = (event) => {
    setClick((oldValues) => {
      return {
        ...oldValues,
        position: event.latLng
      };
    })
    const {lat, lng} = event.latLng.toJSON()
    setProfile((oldValue) => {
      return {
        ...oldValue,
        marker:{
          lat,
          lng,
          type: "INSTITUTION"
        }
      };
    });
  };

  return (
    <div className="profile__content" >
      <Sidebar/>
      <div className="profile__container">
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__form-header">
            <div className="profile__form-header-img">
              <img 
                src={profile?.photo!=="" && profile?.photo!==null ? profile?.photo : photoDefault} 
                alt={`Foto de ${profile?.name}`}
              />
            </div>
            <p className="profile__form-header-user" >{profile?.name}</p>
          </div>
          <Input
            isRow
            label="Usuário"
            value={profile?.username}
            onChange={handleChange}
            name="username"
            larguraCompleta
          />
          <Input
            isRow
            label="Nome"
            value={profile?.name}
            onChange={handleChange}
            name="name"
            larguraCompleta
          />
          <Input
            isRow
            label="E-mail"
            value={profile?.email}
            onChange={handleChange}
            name="email"
            larguraCompleta
          />
          <Input
            isRow
            label="Biografia"
            value={profile?.bio}
            onChange={handleChange}
            name="bio"
            larguraCompleta
          />
          <Input
            isRow
            label="Celular"
            value={profile?.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            larguraCompleta
          />
          {
            isInstitution && 
            <>
              <Input
                isRow
                label="Pix"
                value={profile?.pixKey}
                onChange={handleChange}
                name="pixKey"
                larguraCompleta
              />
              <InputCheckbox
                id={"switch"}
                type="checkbox"
                label="Precisa de doação?"
                onChange={handleChange}
                name="needDonation"
                checked={profile?.needDonation}
              />
              <div className="profile__map">
                <RenderMap
                  onClick={onClickSetLatLng}
                  marker={click}
                />
              </div>
            </>
          }
          <Botao 
            className="profile__botao"
          >
            Atualizar perfil
          </Botao>
        </form>
      </div>
    </div>
  );
};
