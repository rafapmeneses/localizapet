import "./botao.style.css";

export const Botao = ({
  className,
  children,
  onClick,
  tipo,
  variacao,
  desabilitado,
  redondo,
  larguraCompleta,
  icone,
  style,
  form
}) => {
  const css = `${variacao} ${redondo && "redondo"} ${
    larguraCompleta && "width-100"
  } ${icone ? "icone" : "sem-icone"}`;
  return (
    <button
      onClick={onClick}
      disabled={desabilitado}
      className={`botao__principal ${css} ${className}`}
      type={tipo}
      style={style}
      form={form}
    >
      {children}
      {icone ? icone : null}
    </button>
  );
};

Botao.defaultProps = {
  tipo: "submit",
  variacao: "preenchido",
  desabilitado: false,
  redondo: false,
  larguraCompleta: false,
  className: "",
  form: null
};
