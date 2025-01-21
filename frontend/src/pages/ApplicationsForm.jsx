import PropTypes from "prop-types";
import Select from "react-select";
import Button from "../components/Button";
import { useState } from "react";
import Spinner from "../components/Spiner";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Options from "../data/selectOptions";
import TextareaField from "../components/TextareaField";

const ApplicationsForm = ({
  crFormData,
  setCrFormData,
  setApplications,
  closeModal,
}) => {
  const [loadingSave, setLoadingSave] = useState(false);

  const setSelectedLocation = (el) => {
    setCrFormData({ ...crFormData, ["location"]: el.value });
    validateField("location", el.value);
  };

  const setRejectedSelected = (el) => {
    setCrFormData({ ...crFormData, ["rejected"]: el.value });
    validateField("rejected", el.value);
  };

  const setMethodSelected = (el) => {
    setCrFormData({ ...crFormData, ["apply_method"]: el.value });
    validateField("apply_method", el.value);
  };
  const [errors, setErrors] = useState({
    company_name: "",
    company_website: "",
    apply_date: "",
    apply_method: "",
    apply_url: "",
    position: "",
    location: "",
  });
  const validateAll = (formData) => {
    let newErrors = {};
    let valid = true;

    const reqFields = [
      "company_name",
      "company_website",
      "apply_date",
      "apply_method",
      "apply_url",
      "position",
      "location",
    ];

    reqFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Required field.";
        valid = false;
      }
    });

    if (formData.contact_email) {
      if (!/\S+@\S+\.\S+/.test(formData.contact_email)) {
        newErrors.contact_email = "Please enter a valid email address.";
        valid = false;
      }
    }

    return { valid, newErrors };
  };

  const validateField = (name, value) => {
    const newErrors = {};
    let valid = true;

    if (!value) {
      newErrors[name] = "Required Field";
      valid = false;
    } else {
      newErrors[name] = "";
    }

    setErrors({ ...errors, ...newErrors });
    return valid;
  };

  const handleChange = (input) => {
    const { name, value, checked } = input;
    setCrFormData({
      ...crFormData,
      [name]: name !== "favorite" ? value : checked,
    });
    if (
      name == "company_name" ||
      name == "company_website" ||
      name == "apply_date" ||
      name == "apply_method" ||
      name == "apply_url" ||
      name == "position" ||
      name == "location"
    ) {
      validateField(name, value);
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setLoadingSave(true);
    const { valid, newErrors } = validateAll(crFormData);
    setErrors(newErrors);
    if (valid) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(crFormData),
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/application/create",
          options
        );
        const data = await response.json();

        if (data.success) {
          setApplications((prevState) => [...prevState, data.success]);
          closeModal("creation");
        }
        if (data.error) {
          setCrFormData({
            ...crFormData,
            submissionError: data.error,
          });
        }
      } catch (error) {
        setCrFormData({
          ...crFormData,
          submissionError: error.message,
        });
      } finally {
        setLoadingSave(false);
      }
    } else {
      setLoadingSave(false);
    }
  };
  return (
    <form className="modal-form flex w-full lg:w-fit flex-col">
      <div className="modal-content">
        <InputField
          label="Company Name"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"company_name"}
          inputType={"text"}
          inputPlaceholder={"TechCorp Inc."}
        />

        <InputField
          label="Company Website"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"company_website"}
          inputType={"text"}
          inputPlaceholder={"www.techcorp.com"}
        />

        <InputField
          label="Favorite"
          handleChange={handleChange}
          errors={errors}
          fieldName={"favorite"}
          inputType={"checkbox"}
          inputPlaceholder={"www.techcorp.com"}
          className={"mr-[8px]"}
        />

        <InputField
          label="Apply Date"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"apply_date"}
          inputType={"date"}
          inputPlaceholder={"2024-01-15"}
        />

        <SelectField
          label="Apply Method"
          fieldName="apply_method"
          required={true}
          crFormData={crFormData.apply_method}
          errors={errors}
          options={Options.methodOptions}
          setCrFormData={setCrFormData}
          onChangeAction={setMethodSelected}
        />

        <InputField
          label="Apply URL"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"apply_url"}
          inputType={"text"}
          inputPlaceholder={"www.techcorp.com/careers"}
        />

        <InputField
          label="Position"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"position"}
          inputType={"text"}
          inputPlaceholder={"Software Engineer"}
        />

        <SelectField
          label="Location"
          fieldName="location"
          required={true}
          crFormData={crFormData.location}
          errors={errors}
          options={Options.locationOptions}
          setCrFormData={setCrFormData}
          onChangeAction={setSelectedLocation}
        />

        <InputField
          label="Interview Date"
          handleChange={handleChange}
          errors={errors}
          fieldName={"interview_date"}
          inputType={"date"}
          inputPlaceholder={"2024-01-20"}
        />

        <InputField
          label="Offer Amount"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"offer_amount"}
          inputType={"number"}
          inputPlaceholder={"85000"}
        />

        <SelectField
          label="Rejected"
          fieldName="rejected"
          crFormData={crFormData.rejected}
          errors={errors}
          options={Options.rejectedOptions}
          setCrFormData={setCrFormData}
          onChangeAction={setRejectedSelected}
        />

        <InputField
          label="Offer Amount"
          handleChange={handleChange}
          errors={errors}
          fieldName={"offer_amount"}
          inputType={"number"}
          inputPlaceholder={"85000"}
        />

        <InputField
          label="Contact Name"
          handleChange={handleChange}
          errors={errors}
          fieldName={"contact_name"}
          inputType={"text"}
          inputPlaceholder={"John Doe"}
        />
        <TextareaField
          label="Notes"
          fieldName="notes"
          onChangeAction={handleChange}
          placeholder="The interview went well, waiting for feedback."
        />

        <InputField
          label="Contact Email"
          handleChange={handleChange}
          errors={errors}
          fieldName={"contact_email"}
          inputType={"email"}
          inputPlaceholder={"john.doe@example.com"}
        />

        <InputField
          label=" Company Phone"
          handleChange={handleChange}
          errors={errors}
          fieldName={"contact_phone"}
          inputType={"text"}
          inputPlaceholder={"(555) 123-4567"}
        />
      </div>

      <Button
        title="Save"
        onClickAct={(e) => handleSubmitApplication(e)}
        className="mt-0 self-end"
      >
        {loadingSave && <Spinner />}
      </Button>
      {crFormData.submissionError && (
        <em className="err-message">{crFormData.submissionError}</em>
      )}
    </form>
  );
};

ApplicationsForm.propTypes = {
  crFormData: PropTypes.object.isRequired,
  setCrFormData: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  setApplications: PropTypes.func.isRequired,
};
export default ApplicationsForm;
