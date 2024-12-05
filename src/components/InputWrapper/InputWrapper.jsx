import "./InputWrapper.css";

const InputWrapper = ({ label, id, value, onChange, disabled = false }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} value={value} onChange={onChange} disabled={disabled} className={disabled ? "input-disabled" : ""} />
    </div>
  );
};

export default InputWrapper;
