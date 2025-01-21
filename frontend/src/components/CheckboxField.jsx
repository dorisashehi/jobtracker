import PropTypes from "prop-types";

const CheckboxField = ({
  label,
  required = false,
  handleChange,
  errors,
  fieldName,
  className = "",
  value,
}) => {
  return (
    <>
      <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
        <label htmlFor={fieldName} className="modal-label">
          {label} {value}
          {required && <em className="text-redText">*</em>}
        </label>
        <input
          type="checkbox"
          id={fieldName}
          name={fieldName}
          className={`modal-input ${className}`}
          onChange={(e) => handleChange(e.target)}
          checked={value}
        />

        {errors?.[fieldName] && (
          <em className="err-message">{errors[fieldName]}</em>
        )}
      </div>
    </>
  );
};

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  fieldName: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.bool,
};

export default CheckboxField;
