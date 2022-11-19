import "./login.style.css";
import { Botao, Input } from "../../components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthApi, useAuth } from "../../../hooks";
import background from '../../../assets/img/background-login.svg'
import logo from '../../../assets/img/logo-localizapet.svg'

const INITIAL_FORM = {
  username: "",
  password: "",
};

export const Login = () => {
  const { setAuth } = useAuth();
  const useAuthLocalizapetApi = useAuthApi();
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const navigate = useNavigate();

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    setFormValues((oldValues) => {
      return {
        ...oldValues,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {username, password} = formValues
    try {
      const {data} = await useAuthLocalizapetApi.postLogin({
        username: username,
        password: password,
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
  }

  return (
    <div className="login__content">
      <img className="login__img" src={background} alt="Localizapet background"/>
      <div className="login__area-login">
        <img className="login__logo" src={logo} alt="Logo Localizapet" />
        <h1>Localizapet</h1>
        <h3>Entrar</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <Input
            label="Usuário"
            value={formValues.username}
            onChange={handleChange}
            name="username"
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
          <Botao className="login__botao" larguraCompleta>
            Login
          </Botao>
        </form>
        <span className="login__cadastro">
          Caso não tenha conta, registre-se <Link to="/registrar">clicando aqui</Link>
        </span>
      </div> 
    </div>
  );
};
