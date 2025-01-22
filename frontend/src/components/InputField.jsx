import PropTypes from "prop-types";

const InputField = ({
  label,
  required = false,
  handleChange,
  errors,
  fieldName,
  inputPlaceholder,
  className = "",
  inputType = "text",
  value,
}) => {
  return (
    <>
      <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
        <label htmlFor={fieldName} className="modal-label">
          {label}
          {required && <em className="text-redText">*</em>}
        </label>
        <input
          type={inputType}
          id={fieldName}
          name={fieldName}
          placeholder={inputPlaceholder}
          className={`modal-input ${className}`}
          value={value}
          onChange={(e) => handleChange(e.target)}
        />

        {errors?.[fieldName] && (
          <em className="err-message">{errors[fieldName]}</em>
        )}
      </div>
    </>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  fieldName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  inputType: PropTypes.string,
};

export default InputField;
