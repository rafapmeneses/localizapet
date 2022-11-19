import "./input-file.style.css";

export const InputFile = ({
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
  const inputClassName = isRow ? "input-file-isRow__" : "input-file__"

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
        type="file"
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

InputFile.defaultProps = {
  className: "",
  placeholder: "",
  larguraCompleta: false,
  required: false,
};
