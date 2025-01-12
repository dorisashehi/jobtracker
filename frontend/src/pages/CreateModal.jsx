const CreateModal = () => {
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
  return (
    <>
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
              defaultValue={crFormData.apply_method}
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
              defaultValue={crFormData.location}
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
            />
          </div>
          <div className="modal-input-container w-[1/3]">
            <label htmlFor="rejected" className="modal-label">
              Rejected
            </label>
            <Select
              defaultValue={crFormData.rejected}
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
            />
          </div>
        </div>

        <button
          type="submit"
          className="main-btn float-right mt-0 self-end"
          onClick={(e) => handleSubmitApplication(e)}
        >
          Create
        </button>
        {crFormData.submissionError && (
          <em className="err-message">{crFormData.submissionError}</em>
        )}
      </form>
      <div className="modal-container">
        <h1 className="header-main modal-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="icon-style-large"
            fill="#5f6368"
          >
            <path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z" />
          </svg>
          Application Details
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="modal-close"
          fill="#5f6368"
          onClick={() => closeModal("creation")}
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>

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
              defaultValue={crFormData.apply_method}
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
              defaultValue={crFormData.location}
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
            />
          </div>
          <div className="modal-input-container w-[1/3]">
            <label htmlFor="rejected" className="modal-label">
              Rejected
            </label>
            <Select
              defaultValue={crFormData.rejected}
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
            />
          </div>
        </div>

        <button
          type="submit"
          className="main-btn float-right mt-0 self-end"
          onClick={(e) => handleSubmitApplication(e)}
        >
          Create
        </button>
        {crFormData.submissionError && (
          <em className="err-message">{crFormData.submissionError}</em>
        )}
      </form>
    </>
  );
};

export default CreateModal;
