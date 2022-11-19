import "./input-checkbox.style.css";

export const InputCheckbox = ({
  type,
  name,
  label,
  onChange,
  value,
  placeholder,
  className,
  labelClassName,
  required,
  inputClassName,
  checked,
  id
}) => {
  return (
    <div
      className={`input-checkbox__input-label ${className}`}
    >
      <label className={`input-checkbox__label ${labelClassName}`} htmlFor={name}>
        {label}
      </label>
      <input
        id={id}
        className={`input-checkbox__input ${inputClassName}`}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
        checked={checked}
      />
      <label className={"input-checkbox__input-switch"} htmlFor={id}>Toggle</label>
    </div>
  );
};

InputCheckbox.defaultProps = {
  className:"",
  inputClassName:"",
  labelClassName:"",
  type: "checkbox",
  placeholder: "",
  required: false,
};
