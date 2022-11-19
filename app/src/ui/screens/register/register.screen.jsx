import "./register.style.css";
import { Botao, Input, InputCheckbox } from "../../components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthApi, useAuth } from "../../../hooks";
import logo from '../../../assets/img/logo-localizapet.svg';
import background from '../../../assets/img/background-register.svg'

const INITIAL_FORM = {
  name: "",
  username: "",
  email: "",
  password: "",
  roles: [""]
};

export const Register = () => {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const useAuthLocalizapetApi = useAuthApi();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {username, password} = formValues
    try {
      await useAuthLocalizapetApi.postRegister(formValues);

      const {data} = await useAuthLocalizapetApi.postLogin({
        username: username,
        password: password
      });
      const token = data?.token;
      if(token){
        document.cookie = `localizaCookie=${token}`
      }
      setAuth({ token });
      navigate("/");
    } catch (error) {
      throw error
    }
  };

  const handleChange = (event) => {
    const { value, name, checked } = event.target;

    setFormValues((oldValues) => {
      if(name==="roles"){
        return{
          ...oldValues,
          [name]: [checked?value:""],
        }
      }
      else{
        return {
          ...oldValues,
          [name]: value,
        };
      }
    });
  };

  return (
    <div className="register__content">
      <div className="register__area-register">
        <img className="register__logo" src={logo} alt="Logo Localizapet" />
        <h1>Localizapet</h1>
        <h3>Cadastre-se</h3>
        <form className="register__form" onSubmit={handleSubmit}>
          <Input
            label={formValues.roles[0] !== ""? "Nome da Instituição" : "Nome Completo"}
            value={formValues.name}
            onChange={handleChange}
            name="name"
            larguraCompleta
          />
          <Input
            label="Usuário"
            value={formValues.username}
            onChange={handleChange}
            name="username"
            larguraCompleta
          />
          <Input
            label="E-mail"
            value={formValues.email}
            onChange={handleChange}
            name="email"
            larguraCompleta
          />
          <Input
            label="Senha"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            name="password"
            larguraCompleta
          />
          <InputCheckbox
            id={"switch"}
            type="checkbox"
            label="Instituição"
            onChange={handleChange}
            name="roles"
            value={"institution"}
          />
          <Botao className="register__botao" larguraCompleta>
            Registrar
          </Botao>
        </form>
        <span className="register__login">
          Você tem conta? acessa ela <Link to="/login">clicando aqui</Link>
        </span>
      </div>
      <img className="register__img" src={background} alt="Localizapet Register background"/>
    </div>
  );
};
