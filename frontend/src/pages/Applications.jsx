import { AuthenticatedContext } from "../context/AuthenticatedContext";
import { useContext, useState } from "react";
import Select from "react-select";
import Modal from "react-modal";
const Applications = () => {
  const { user, isAuthenticated } = useContext(AuthenticatedContext);
  const [modalIsOpen, setIsOpen] = useState({
    creation: false,
    edition: false,
    view: false,
  });

  function openModal(modalName) {
    setIsOpen({ ...modalIsOpen, [modalName]: true });
  }

  function closeModal(modalName) {
    setIsOpen({ ...modalIsOpen, [modalName]: false });
  }

  Modal.setAppElement("#root");

  const locationOptions = [
    { value: "onsite", label: "On-Site" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "optional", label: "Optional" },
  ];

  const [selectedLocation, setLocationSelected] = useState(null);

  const rejectedOptions = [
    { value: "response", label: "From Response" },
    { value: "interview", label: "After Interview" },
    { value: "offer", label: "After Offer" },
    { value: "other", label: "Other" },
  ];

  const [selectedRejection, setRejectedSelected] = useState(null);

  const methodOptions = [
    { value: "company_web", label: "Company Website" },
    { value: "job_board", label: "Job Board" },
    { value: "recruiter", label: "Recruiter" },
    { value: "referal", label: "Referal" },
    { value: "email", label: "Email" },
    { value: "other", label: "Other" },
  ];

  const [selectedMethod, setMethodSelected] = useState(null);

  const hangeEditAction = () => {
    console.log("Edit Action");
  };
  return (
    <>
      <div className="container-main justify-center bg-[#f5f7f9]">
        <div className="content justify-center flex lg:flex-col">
          {isAuthenticated ? (
            <>
              <div className="flex-1">
                <div className="flex flex-col">
                  <div className="header-w-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-style-large"
                      viewBox="0 -960 960 960"
                      fill="text-black"
                    >
                      <path d="M240-280h240v-80H240v80Zm120-160h240v-80H360v80Zm120-160h240v-80H480v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                    </svg>
                    <h1 className="header-main">Applications</h1>
                  </div>
                  <p className="header-text-desc mt-2">
                    Manage all of your job applications
                  </p>
                </div>
              </div>

              <div className="flex-1 filter-bar">
                <button
                  type="submit"
                  onClick={() => openModal("creation")}
                  className="main-btn float-right mt-0"
                >
                  <p>Create</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-style-small fill-[#FFFFFF]"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                </button>
                <div className="flex gap-5">
                  <div className="relative w-fit">
                    <div className="search-container">
                      <svg
                        className="search-icon"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="search-input-box"
                      placeholder="Search by company name, position, or location"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    // onClick={() => openModal("creation")}
                    className="main-btn float-right mt-0"
                  >
                    <p>Export</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      className="icon-style-small fill-[#FFFFFF]"
                    >
                      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h200v80H160v480h640v-480H600v-80h200q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-184L280-544l56-56 104 104v-304h80v304l104-104 56 56-200 200Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <table className="table-design">
                  <thead className="uppercase border-[1.5px] border-borderColor">
                    <tr>
                      <th className="table-head"></th>
                      <th className="table-head">Date</th>
                      <th className="table-head">Name</th>
                      <th className="table-head">Method</th>
                      <th className="table-head">Position</th>
                      <th className="table-head">Fit</th>
                      <th className="table-head">Location</th>
                      <th className="table-head">Interview</th>
                      <th className="table-head">Offer</th>
                      <th className="table-head">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="table-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          fill="#5f6368"
                          className="icon-style-small"
                        >
                          <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                        </svg>
                      </td>
                      <td className="table-item">2025-01-01</td>
                      <td className="table-item">John Doe</td>
                      <td className="table-item">Online</td>
                      <td className="table-item">Software Engineer</td>
                      <td className="table-item">Excellent</td>
                      <td className="table-item">New York</td>
                      <td className="table-item">2025-01-05</td>
                      <td className="table-item">Pending</td>
                      <td className="table-item">
                        <button
                          onClick={() => openModal("view")}
                          className="main-btn bg-lightGreen"
                        >
                          View
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className="table-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          fill="#5f6368"
                          className="icon-style-small"
                        >
                          <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                        </svg>
                      </td>
                      <td className="table-item">2025-01-01</td>
                      <td className="table-item">John Doe</td>
                      <td className="table-item">Online</td>
                      <td className="table-item">Software Engineer</td>
                      <td className="table-item">Excellent</td>
                      <td className="table-item">New York</td>
                      <td className="table-item">2025-01-05</td>
                      <td className="table-item">Pending</td>
                      <td className="table-item">
                        <button
                          onClick={() => openModal("view")}
                          className="main-btn bg-lightGreen"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p>Not Authenticated</p>
          )}
          <Modal
            isOpen={modalIsOpen.creation}
            onRequestClose={() => closeModal("creation")}
            contentLabel="Create Application"
          >
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
                  />
                </div>
                <div className="modal-input-container">
                  <label htmlFor="company_web" className="modal-label">
                    Company Website<em className="text-redText">*</em>
                  </label>
                  <input
                    type="text"
                    id="company_web"
                    name="company_web"
                    placeholder="www.techcorp.com"
                    className="login-input modal-input"
                  />
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
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="application_date" className="modal-label">
                    Apply Date<em className="text-redText">*</em>
                  </label>
                  <input
                    type="date"
                    id="application_date"
                    name="application_date"
                    placeholder="2024-01-15"
                    className="login-input modal-input"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="application_method" className="modal-label">
                    Apply Method<em className="text-redText">*</em>
                  </label>
                  <Select
                    defaultValue={selectedMethod}
                    onChange={() => setMethodSelected}
                    options={methodOptions}
                    id="application_method"
                    name="application_method"
                    className="login-input modal-input p-[0px] outline-none active:outline-none"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="application_url" className="modal-label">
                    Apply URL<em className="text-redText">*</em>
                  </label>
                  <input
                    type="text"
                    id="application_url"
                    name="application_url"
                    placeholder="www.techcorp.com/careers"
                    className="login-input modal-input"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="positon" className="modal-label">
                    Position<em className="text-redText">*</em>
                  </label>
                  <input
                    type="text"
                    id="positon"
                    name="positon"
                    placeholder="Software Engineer"
                    className="login-input modal-input"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="location" className="modal-label">
                    Location<em className="text-redText">*</em>
                  </label>
                  <Select
                    defaultValue={selectedLocation}
                    onChange={() => setLocationSelected}
                    options={locationOptions}
                    id="location"
                    name="location"
                    className="login-input modal-input p-[0px] outline-none active:outline-none"
                  />
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
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="amount_offered" className="modal-label">
                    Offer Amount
                  </label>
                  <input
                    type="number"
                    id="amount_offered"
                    name="amount_offered"
                    placeholder="85000"
                    className="login-input modal-input"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="rejected" className="modal-label">
                    Rejected
                  </label>
                  <Select
                    defaultValue={selectedRejection}
                    onChange={() => setRejectedSelected}
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
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="company_phone" className="modal-label">
                    Company Phone
                  </label>
                  <input
                    type="text"
                    id="company_phone"
                    name="company_phone"
                    placeholder="(555) 123-4567"
                    className="login-input modal-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="main-btn float-right mt-0 self-end"
                // onClick={(e) => submitAction(e)}
              >
                Create
              </button>
            </form>
          </Modal>

          <Modal
            isOpen={modalIsOpen.view}
            onRequestClose={() => closeModal("view")}
            contentLabel="Edit Application"
          >
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
                Edit Application Details
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="icon-style-small cursor-pointer"
                fill="#5f6368"
                onClick={() => closeModal("view")}
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
                  />
                </div>
                <div className="modal-input-container">
                  <label htmlFor="company_web" className="modal-label">
                    Company Website<em className="text-redText">*</em>
                  </label>
                  <input
                    type="text"
                    id="company_web"
                    name="company_web"
                    placeholder="www.techcorp.com"
                    className="login-input modal-input"
                  />
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
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="application_date" className="modal-label">
                    Apply Date<em className="text-redText">*</em>
                  </label>
                  <input
                    type="date"
                    id="application_date"
                    name="application_date"
                    placeholder="2024-01-15"
                    className="login-input modal-input"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="application_method" className="modal-label">
                    Apply Method<em className="text-redText">*</em>
                  </label>
                  <Select
                    defaultValue={selectedMethod}
                    onChange={() => setMethodSelected}
                    options={methodOptions}
                    id="application_method"
                    name="application_method"
                    className="login-input modal-input p-[0px] outline-none active:outline-none"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="application_url" className="modal-label">
                    Apply URL<em className="text-redText">*</em>
                  </label>
                  <input
                    type="text"
                    id="application_url"
                    name="application_url"
                    placeholder="www.techcorp.com/careers"
                    className="login-input modal-input"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="positon" className="modal-label">
                    Position<em className="text-redText">*</em>
                  </label>
                  <input
                    type="text"
                    id="positon"
                    name="positon"
                    placeholder="Software Engineer"
                    className="login-input modal-input"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="location" className="modal-label">
                    Location<em className="text-redText">*</em>
                  </label>
                  <Select
                    defaultValue={selectedLocation}
                    onChange={() => setLocationSelected}
                    options={locationOptions}
                    id="location"
                    name="location"
                    className="login-input modal-input p-[0px] outline-none active:outline-none"
                  />
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
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="amount_offered" className="modal-label">
                    Offer Amount
                  </label>
                  <input
                    type="number"
                    id="amount_offered"
                    name="amount_offered"
                    placeholder="85000"
                    className="login-input modal-input"
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="rejected" className="modal-label">
                    Rejected
                  </label>
                  <Select
                    defaultValue={selectedRejection}
                    onChange={() => setRejectedSelected}
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
                  />
                </div>
                <div className="modal-input-container w-[1/3]">
                  <label htmlFor="company_phone" className="modal-label">
                    Company Phone
                  </label>
                  <input
                    type="text"
                    id="company_phone"
                    name="company_phone"
                    placeholder="(555) 123-4567"
                    className="login-input modal-input"
                  />
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default Applications;
