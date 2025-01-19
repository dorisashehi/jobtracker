import PropTypes from "prop-types";
import Select from "react-select";
import Button from "../components/Button";
import { useState } from "react";

const ApplicationsForm = ({
  crFormData,
  setCrFormData,
  setApplications,
  closeModal,
}) => {
  const locationOptions = [
    { value: "onsite", label: "On-Site" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "optional", label: "Optional" },
  ];

  const setSelectedLocation = (el) => {
    setCrFormData({ ...crFormData, ["location"]: el.value });
    validateField("location", el.value);
  };

  const rejectedOptions = [
    { value: "response", label: "From Response" },
    { value: "interview", label: "After Interview" },
    { value: "offer", label: "After Offer" },
    { value: "other", label: "Other" },
  ];

  const setRejectedSelected = (el) => {
    setCrFormData({ ...crFormData, ["rejected"]: el.value });
    validateField("rejected", el.value);
  };

  const methodOptions = [
    { value: "company_web", label: "Company Website" },
    { value: "job_board", label: "Job Board" },
    { value: "recruiter", label: "Recruiter" },
    { value: "referal", label: "Referal" },
    { value: "email", label: "Email" },
    { value: "other", label: "Other" },
  ];

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
      }
    }
  };
  return (
    <form className="modal-form flex w-full lg:w-fit flex-col">
      <div className="modal-content">
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="company_name" className="modal-label">
            Company Name<em className="text-redText">*</em>
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            placeholder="TechCorp Inc."
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />

          {errors.company_name && (
            <em className="err-message">{errors.company_name}</em>
          )}
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="company_website" className="modal-label">
            Company Website<em className="text-redText">*</em>
          </label>
          <input
            type="text"
            id="company_website"
            name="company_website"
            placeholder="www.techcorp.com"
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />
          {errors.company_website && (
            <em className="err-message">{errors.company_website}</em>
          )}
        </div>
        <div className="modal-input-container flex items-start min-w-[300px] ">
          <label htmlFor="favorite" className="modal-label ">
            Favorite
          </label>

          <input
            type="checkbox"
            id="favorite"
            name="favorite"
            className="modal-input mr-[8px]"
            onChange={(e) => handleChange(e.target)}
          />
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="apply_date" className="modal-label">
            Apply Date<em className="text-redText">*</em>
          </label>
          <input
            type="date"
            id="apply_date"
            name="apply_date"
            placeholder="2024-01-15"
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />
          {errors.apply_date && (
            <em className="err-message">{errors.apply_date}</em>
          )}
        </div>
        <div className="modal-input-container min-w-[300px] ">
          <label htmlFor="apply_method" className="modal-label">
            Apply Method<em className="text-redText">*</em>
          </label>
          <Select
            defaultValue={crFormData.apply_method}
            onChange={setMethodSelected}
            options={methodOptions}
            id="apply_method"
            name="apply_method"
            className="modal-input p-[0px] outline-none active:outline-none"
          />
          {errors.apply_method && (
            <em className="err-message">{errors.apply_method}</em>
          )}
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="apply_url" className="modal-label">
            Apply URL<em className="text-redText">*</em>
          </label>
          <input
            type="text"
            id="apply_url"
            name="apply_url"
            placeholder="www.techcorp.com/careers"
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />
          {errors.apply_url && (
            <em className="err-message">{errors.apply_url}</em>
          )}
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="position" className="modal-label">
            Position<em className="text-redText">*</em>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="Software Engineer"
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />
          {errors.position && (
            <em className="err-message">{errors.position}</em>
          )}
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="location" className="modal-label">
            Location<em className="text-redText">*</em>
          </label>
          <Select
            defaultValue={crFormData.location}
            onChange={setSelectedLocation}
            options={locationOptions}
            id="location"
            name="location"
            className="modal-input p-[0px] outline-none active:outline-none"
          />
          {errors.location && (
            <em className="err-message">{errors.location}</em>
          )}
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="interview_date" className="modal-label">
            Interview Date
          </label>
          <input
            type="date"
            id="interview_date"
            name="interview_date"
            placeholder="2024-01-20"
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="offer_amount" className="modal-label">
            Offer Amount
          </label>
          <input
            type="number"
            id="offer_amount"
            name="offer_amount"
            placeholder="85000"
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="rejected" className="modal-label">
            Rejected
          </label>
          <Select
            defaultValue={crFormData.rejected}
            onChange={setRejectedSelected}
            options={rejectedOptions}
            id="rejected"
            name="rejected"
            className="modal-input p-[0px] outline-none active:outline-none"
          />
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="contact_name" className="modal-label">
            Contact Name
          </label>
          <input
            type="text"
            id="contact_name"
            name="contact_name"
            placeholder="John Doe"
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="notes" className="modal-label">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={5}
            placeholder="The interview went well, waiting for feedback."
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          ></textarea>
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="contact_email" className="modal-label">
            Contact Email
          </label>
          <input
            type="email"
            id="contact_email"
            name="contact_email"
            placeholder="john.doe@example.com"
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />
          {errors.contact_email && (
            <em className="err-message">{errors.contact_email}</em>
          )}
        </div>
        <div className="modal-input-container md:w-1/2 lg:w-1/2 xl:w-1/3">
          <label htmlFor="contact_phone" className="modal-label">
            Company Phone
          </label>
          <input
            type="text"
            id="contact_phone"
            name="contact_phone"
            placeholder="(555) 123-4567"
            className="modal-input"
            onChange={(e) => handleChange(e.target)}
          />
        </div>
      </div>

      {/* <button
        type="submit"
        className="main-btn float-right mt-0 self-end"
        onClick={(e) => handleSubmitApplication(e)}
      >
        Create
      </button> */}

      <Button
        title="Save"
        onClickAct={(e) => handleSubmitApplication(e)}
        className="mt-0 self-start"
      ></Button>
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
