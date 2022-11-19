import "./botao-icone.style.css";

export const BotaoIcone = ({
  children,
  className,
  onClick,
  desabilitado,
  icone,
  iconePers,
  tipo
}) => {
  return (
    <button
      onClick={onClick}
      disabled={desabilitado}
      className={`botao-icone__principal ${className}`}
      type={tipo}
    >
      {iconePers ? <img src={iconePers} className={"botao-icone__iconePers"}/> : null}
      {icone ? icone : null}
      {children}
    </button>
  );
};

BotaoIcone.defaultProps = {
  className: "",
  tipo: "submit"
};
