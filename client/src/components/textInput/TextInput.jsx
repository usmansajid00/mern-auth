import "./textInput.scss";

const TextInput = ({ error, errormessage, ...inputProps }) => {
  return (
    <div className="input_wrapper">
      <label className="custom_label">{inputProps.label}</label>
      <input className="custom_input" {...inputProps} />
      {error && <p className="error_message">{errormessage}</p>}
    </div>
  );
};

export default TextInput;
