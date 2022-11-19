import "./input-select.style.css";

export const InputSelect = ({
  name,
  label,
  onChange,
  value,
  placeholder,
  larguraCompleta,
  className,
  required,
  inputClassNameAdd,
  list,
  desabilitado,
  isRow
}) => {
  const inputClassName = isRow ? "input-select-isRow__" : "input-select__"

  return (
    <div
      className={`${inputClassName}input-content ${
        larguraCompleta && "width-100"
      } ${className}`}
      
    >
      <label className={`${inputClassName}label`} htmlFor={name}>
        {label}
      </label>
      <select
        className={`${inputClassName}input ${inputClassNameAdd}`}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={desabilitado}
      >
        {Object.keys(list).map((item) => (
          <option
            key={item}
            value={item}
            name={`${item}`}
          >
            {list[item]}
          </option>
        ))}
      </select>
    </div>
  );
};

InputSelect.defaultProps = {
  className: "",
  placeholder: "",
  larguraCompleta: false,
  required: false,
  list:{},
  desabilitado: false
};
