import "./card.style.css";
import photoDefault from "../../../assets/img/photo-default.svg";

export const Card = ({info, onClick}) => {

  return (
    <button className="card__content" onClick={()=>onClick(info.id)}>
      <img src={info?.photo!=="" && info?.photo!==null ? info?.photo : photoDefault}/>
      <p>{info?.name}</p>
    </button>
  );
};

Card.defaultProps = {
  
};
