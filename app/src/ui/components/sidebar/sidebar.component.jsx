import "./sidebar.style.css";
import { useState } from "react";
import { List, Home, LogOut, Filter, User } from "react-feather";
import { GiSittingDog } from 'react-icons/gi';
import { RiHeartAddLine } from 'react-icons/ri';
import { BotaoIcone, FindPets, FilterMap } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthApi } from "../../../hooks";
import logo from '../../../assets/img/logo-localizapet.svg'


export const Sidebar = ({handleChangeFilter, clearFilter}) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const useAuthApiLocalizapet = useAuthApi();
  const [findBar, setFindBar] = useState(false);
  const [filterBar, setFilterBar] = useState(false);

  const onClickNavigate = (to) => {
    if(to==="home"){
      navigate('/')
    }
    else if(to==="register-pet"){
      navigate('/registrar-pet')
    }
    else if(to==="profile"){
      navigate('/perfil')
    }
  };

  const onClickLogout = () => {
    useAuthApiLocalizapet.delLogout();
    navigate(0);
  };

  return (
    <>
      <div className="sidebar__content">
        <BotaoIcone 
          onClick={()=>onClickNavigate("home")}
          className={"sidebar__logo-button"}
          iconePers={logo}
        >
          <p className="sidebar__localizapet">Localizapet</p>
        </BotaoIcone>

        <div className="sidebar__actions">
          <BotaoIcone 
            onClick={()=>onClickNavigate("home")}
            icone={<Home color="var(--purple-heavy-3)" />}
          >
            Home
          </BotaoIcone>
          <BotaoIcone 
            onClick={()=>onClickNavigate("register-pet")}
            icone={<RiHeartAddLine size={24} color="var(--purple-heavy-3)" />}
          >
            Cadastrar animal
          </BotaoIcone>
          
          <BotaoIcone
            onClick={()=>{
              setFindBar(!findBar)
              setFilterBar(false)
            }}
            icone={<GiSittingDog size={24} color="var(--purple-heavy-3)" />}
          >
            Meus animais
          </BotaoIcone>

          <BotaoIcone
            onClick={()=>onClickNavigate("profile")}
            icone={<User color="var(--purple-heavy-3)" />}
          >
            Perfil
          </BotaoIcone>

          <BotaoIcone
            onClick={()=>{
              setFilterBar(!filterBar)
              setFindBar(false)
            }}
            icone={<Filter color="var(--purple-heavy-3)" />}
            desabilitado={pathname!=="/"}
          >
            Filtros
          </BotaoIcone>
        </div>

        <BotaoIcone 
          className={"sidebar__logout-button"}
          icone={<LogOut color="var(--purple-heavy-3)" />}
          onClick={onClickLogout}
        >
          <p className="sidebar__logout">Logout</p>
        </BotaoIcone>
      </div>
      <FindPets showComponent={findBar}/>
      <FilterMap 
        showComponent={filterBar} 
        handleChangeFilter={handleChangeFilter}
        clearFilter={clearFilter}
      />
    </>
    
  )
}