import "./institution.style.css";
import { LabelInfo, Sidebar } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { useUserApi } from "../../../hooks";
import { useLocation } from "react-router-dom";
import photoDefault from "../../../assets/img/photo-default.svg";

const INITIAL_INFO = {
  id:"",
  name:"",
  username:"",
  email:"",
  bio:"",
  photo:"",
  phoneNumber: "",
  pixKey: "",
  needDonation: ""
};

export const Institution = () => {
  const [institution, setInstitution] = useState(INITIAL_INFO);
  const useUserLocalizapetApi = useUserApi();
  const { pathname } = useLocation();

  const updateInstitution = useCallback(async () => {
    try {
      const institutionId = pathname.replace("/instituicao/", "");
      const { data } = await useUserLocalizapetApi.getFullUser(institutionId);
      setInstitution(data);
    } catch (error) {
      throw error;
    }
  }, [useUserLocalizapetApi]);

  useEffect(()=>{
    updateInstitution();
  },[updateInstitution]);

  return (
    <div className="institution__content" >
      <Sidebar></Sidebar>
      <div className="institution__container">
      <div className="institution__info">
        <div className="institution__info-header">
          <div className="institution__info-header-img">
            <img 
              src={institution?.photo!=="" && institution?.photo!==null ? institution?.photo : photoDefault}  
              alt={`Foto de ${institution?.name}`} 
            />
          </div>
          <p className="institution__info-header-name">{institution?.name}</p>
        </div>
        {/* <LabelInfo label={"Name"} info={institution?.name}/> */}
        <LabelInfo label={"Email"} info={institution?.email}/>
        <LabelInfo label={"Biografia"} info={institution?.bio}/>
        <LabelInfo label={"Contato"} info={institution?.phoneNumber}/>
        {
          institution?.needDonation 
          &&
          <>
            <LabelInfo label={"Pix"} info={institution?.pixKey}/>
            <p className="institution__info-situation-need">A institution precisa de doações!</p>
          </>
        }
      </div>
      </div>
    </div>
  );
};
