const TextInput = ({ error, errormessage, ...inputProps }) => {
  return (
    <div>
      <input {...inputProps} />
      {error && <p>{errormessage}</p>}
    </div>
  );
};

export default TextInput;
