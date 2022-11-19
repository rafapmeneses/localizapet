import "./input.style.css";

export const Input = ({
  type,
  name,
  label,
  onChange,
  value,
  placeholder,
  larguraCompleta,
  className,
  required,
  inputClassNameAdd,
  isRow
}) => {
  const inputClassName = isRow ? "input-isRow__" : "input__"

  return (
    <div
      className={`${inputClassName}input-content ${
        larguraCompleta && "width-100"
      } ${className}`}
    >
      <label className={`${inputClassName}label`} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${inputClassName}input ${inputClassNameAdd}`}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

Input.defaultProps = {
  className: "",
  type: "text",
  placeholder: "",
  larguraCompleta: false,
  required: false,
};
