import PropTypes from "prop-types";
import Select from "react-select";
import { useState } from "react";
import ApplicationsAPI from "../services/ApplicationsAPI";

const EditApplicationsForm = ({ closeModal, application }) => {
  const [applicationData, setApplicationData] = useState(application);
  const locationOptions = [
    { value: "onsite", label: "On-Site" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "optional", label: "Optional" },
  ];

  const setSelectedLocation = (el) => {
    setApplicationData({ ...applicationData, ["location"]: el.value });
    validateField("location", el.value);
  };

  const rejectedOptions = [
    { value: "response", label: "From Response" },
    { value: "interview", label: "After Interview" },
    { value: "offer", label: "After Offer" },
    { value: "other", label: "Other" },
  ];

  const setRejectedSelected = (el) => {
    applicationData({ ...applicationData, ["rejected"]: el.value });
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
    setApplicationData({ ...applicationData, ["apply_method"]: el.value });
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

    if (
      name == "company_name" ||
      name == "company_website" ||
      name == "apply_date" ||
      name == "apply_method" ||
      name == "apply_url" ||
      name == "position" ||
      name == "location"
    ) {
      if (!value) {
        newErrors[name] = "Required Field";
        valid = false;
      } else {
        newErrors[name] = "";
      }
    }

    setErrors({ ...errors, ...newErrors });
    return valid;
  };

  const handleChange = (input) => {
    const { name, value } = input;

    setApplicationData({
      ...applicationData,
      [name]: value,
    });

    validateField(name, value);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    const { valid, newErrors } = validateAll(applicationData);
    setErrors(newErrors);
    if (valid) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      };

      try {
        const response = await ApplicationsAPI.updateApplById(
          application.id,
          options
        );
        const data = response[0];

        if (data.success) {
          closeModal("edition");
        }
        if (data.error) {
          setApplicationData({
            ...applicationData,
            submissionError: data.error,
          });
        }
      } catch (error) {
        setApplicationData({
          ...applicationData,
          submissionError: error.message,
        });
      }
    }
  };
  return (
    <form className="modal-form flex w-fit flex-col">
      <div className="modal-content">
        <div className="modal-input-container">
          <label htmlFor="company_name" className="modal-label">
            Company Name<em className="text-redText">*</em>
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            placeholder="TechCorp Inc."
            className="login-input modal-input"
            value={applicationData.company_name}
            onChange={(e) => handleChange(e.target)}
          />

          {errors.company_name && (
            <em className="err-message">{errors.company_name}</em>
          )}
        </div>
        <div className="modal-input-container">
          <label htmlFor="company_website" className="modal-label">
            Company Website<em className="text-redText">*</em>
          </label>
          <input
            type="text"
            id="company_website"
            name="company_website"
            placeholder="www.techcorp.com"
            className="login-input modal-input"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.company_website}
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
            className="login-input mr-[8px]"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.favorite}
          />
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="apply_date" className="modal-label">
            Apply Date<em className="text-redText">*</em>
          </label>
          <input
            type="date"
            id="apply_date"
            name="apply_date"
            placeholder="2024-01-15"
            className="login-input modal-input"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.apply_date}
          />
          {errors.apply_date && (
            <em className="err-message">{errors.apply_date}</em>
          )}
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="apply_method" className="modal-label">
            Apply Method<em className="text-redText">*</em>
          </label>
          <Select
            defaultValue={methodOptions.find(
              (el) => el.value === applicationData.apply_method
            )}
            onChange={setMethodSelected}
            options={methodOptions}
            id="apply_method"
            name="apply_method"
            className="login-input modal-input p-[0px] outline-none active:outline-none"
          />
          {errors.apply_method && (
            <em className="err-message">{errors.apply_method}</em>
          )}
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="apply_url" className="modal-label">
            Apply URL<em className="text-redText">*</em>
          </label>
          <input
            type="text"
            id="apply_url"
            name="apply_url"
            placeholder="www.techcorp.com/careers"
            className="login-input modal-input"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.apply_url}
          />
          {errors.apply_url && (
            <em className="err-message">{errors.apply_url}</em>
          )}
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="position" className="modal-label">
            Position<em className="text-redText">*</em>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="Software Engineer"
            className="login-input modal-input"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.position}
          />
          {errors.position && (
            <em className="err-message">{errors.position}</em>
          )}
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="location" className="modal-label">
            Location<em className="text-redText">*</em>
          </label>
          <Select
            defaultValue={locationOptions.find(
              (el) => el.value === applicationData.location
            )}
            onChange={setSelectedLocation}
            options={locationOptions}
            id="location"
            name="location"
            className="login-input modal-input p-[0px] outline-none active:outline-none"
          />
          {errors.location && (
            <em className="err-message">{errors.location}</em>
          )}
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="interview_date" className="modal-label">
            Interview Date
          </label>
          <input
            type="date"
            id="interview_date"
            name="interview_date"
            placeholder="2024-01-20"
            className="login-input modal-input"
            value={applicationData.interview_date}
            onChange={(e) => handleChange(e.target)}
          />
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="offer_amount" className="modal-label">
            Offer Amount
          </label>
          <input
            type="number"
            id="offer_amount"
            name="offer_amount"
            placeholder="85000"
            className="login-input modal-input"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.offer_amount}
          />
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="rejected" className="modal-label">
            Rejected
          </label>
          <Select
            defaultValue={rejectedOptions.find(
              (el) => el.value === applicationData.rejected
            )}
            onChange={setRejectedSelected}
            options={rejectedOptions}
            id="rejected"
            name="rejected"
            className="login-input modal-input p-[0px] outline-none active:outline-none"
          />
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="contact_name" className="modal-label">
            Contact Name
          </label>
          <input
            type="text"
            id="contact_name"
            name="contact_name"
            placeholder="John Doe"
            className="login-input modal-input"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.contact_name}
          />
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="notes" className="modal-label">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={5}
            placeholder="The interview went well, waiting for feedback."
            className="login-input modal-input"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.notes}
          ></textarea>
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="contact_email" className="modal-label">
            Contact Email
          </label>
          <input
            type="email"
            id="contact_email"
            name="contact_email"
            placeholder="john.doe@example.com"
            className="login-input modal-input"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.contact_email}
          />
          {errors.contact_email && (
            <em className="err-message">{errors.contact_email}</em>
          )}
        </div>
        <div className="modal-input-container w-[1/3]">
          <label htmlFor="contact_phone" className="modal-label">
            Company Phone
          </label>
          <input
            type="text"
            id="contact_phone"
            name="contact_phone"
            placeholder="(555) 123-4567"
            className="login-input modal-input"
            onChange={(e) => handleChange(e.target)}
            value={applicationData.contact_phone}
          />
        </div>
      </div>

      <button
        type="submit"
        className="main-btn float-right mt-0 self-end"
        onClick={(e) => handleSubmitApplication(e)}
      >
        Update
      </button>
      {applicationData.submissionError && (
        <em className="err-message">{applicationData.submissionError}</em>
      )}
    </form>
  );
};

EditApplicationsForm.propTypes = {
  application: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default EditApplicationsForm;
