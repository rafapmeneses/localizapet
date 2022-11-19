import "./filter-map.style.css";
import { Input, InputSelect, Botao, InputCheckbox } from "../../components";
import { useState } from "react";

const TYPE = {
  "": "Todos",
  PET_ADOPTION: "Adoção",
  LOST: "Perdido",
  INSTITUTION: "Instituição"
}

const INITIAL_FILTER = {
  typeInMap: "",
  title: "",
  owner: false
}

export const FilterMap = ({showComponent, handleChangeFilter, clearFilter}) =>{
  const [filter, setFilter] = useState(INITIAL_FILTER);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFilter((oldValue) => {
      if(name==="owner"){
        return {
          ...oldValue,
          [name]: checked,
        };
      }
      else{
        return {
          ...oldValue,
          [name]: value,
        };
      }
    });
    if(name==="owner"){
      handleChangeFilter(name, checked)
    }
    else{
      handleChangeFilter(name, value)
    }
  };
  
  const onClickClearFilter = (event) => {
    setFilter(INITIAL_FILTER)
    clearFilter()
  };

  return (
    <div className={`filter-map__content ${showComponent ? "filter-map__show" : ""}`}>
      <div className="filter-map__container">
        <h3>Filtrar Mapa</h3>
        <Input 
          larguraCompleta
          value={filter?.title}
          name={"title"}
          onChange={handleChange}
          placeholder={"Pesquisar"}
        />

        <InputSelect 
          label="Tipo"
          value={filter?.typeInMap}
          onChange={handleChange}
          name="typeInMap"
          larguraCompleta
          list={TYPE}
        />

        <InputCheckbox
          id={"check"}
          checked={filter?.owner}
          type="checkbox"
          label="Meus pontos"
          onChange={handleChange}
          name="owner"
        />

        <Botao onClick={onClickClearFilter}>Limpar</Botao>
      </div>
    </div>
  )
}