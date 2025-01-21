import PropTypes from "prop-types";
const TextareaField = ({
  label,
  fieldName,
  required = false,
  onChangeAction,
  placeholder,
}) => {
  return (
    <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
      <label htmlFor={fieldName} className="modal-label">
        {label}
        {required && <em className="text-redText">*</em>}
      </label>
      <textarea
        id={fieldName}
        name={fieldName}
        rows={5}
        placeholder={placeholder}
        className="modal-input"
        onChange={(e) => onChangeAction(e.target)}
      ></textarea>
    </div>
  );
};

TextareaField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TextareaField;
