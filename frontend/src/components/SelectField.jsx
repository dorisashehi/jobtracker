import Select from "react-select";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  fieldName,
  required = false,
  crFormData,
  options,
  onChangeAction,
  errors,
}) => {
  return (
    <>
      <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
        <label htmlFor={fieldName} className="modal-label">
          {label} {required && <em className="text-redText">*</em>}
        </label>
        <Select
          defaultValue={crFormData}
          onChange={onChangeAction}
          options={options}
          id={fieldName}
          name={fieldName}
          className="modal-input p-[0px] outline-none active:outline-none"
        />
        {errors?.[fieldName] && (
          <em className="err-message">{errors[fieldName]}</em>
        )}
      </div>
    </>
  );
};
SelectField.propTypes = {
  crFormData: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
  setCrFormData: PropTypes.func.isRequired,
  onChangeAction: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default SelectField;
