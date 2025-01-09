import { AuthenticatedContext } from "../context/AuthenticatedContext";
import { useContext, useState } from "react";
import Select from "react-select";
import Modal from "react-modal";
const EditApplications = () => {
  const { user, isAuthenticated } = useContext(AuthenticatedContext);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  Modal.setAppElement("#root");

  const customStyles = {
    // modal: {
    //   position: "absolute",
    //   inset: "40px",
    //   border: "1px solid rgb(204, 204, 204)",
    //   background: "rgb(255, 255, 255)",
    //   overflow: "auto",
    //   borderRadius: "4px",
    //   outline: "none",
    //   padding: "20px",
    //   top: "50%",
    //   left: "50%",
    //   right: "auto",
    //   bottom: "auto",
    //   marginRight: "-50%",
    //   transform: "translate(-50%, -50%)",
    //   width: "80%", // Adjust width
    // },
    // overlay: {
    //   backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    // },
  };

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

              <div className="flex-1 py-10 flex flex-col">
                <button
                  type="submit"
                  onClick={() => openModal()}
                  className="main-btn float-right mt-0  mb-5 "
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
                <table className="table-design">
                  <thead className="uppercase border-[1.5px] border-borderColor">
                    <tr>
                      <th className="pl-0 table-head">Date</th>
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
                      <td className="table-item pl-0">2025-01-01</td>
                      <td className="table-item">John Doe</td>
                      <td className="table-item">Online</td>
                      <td className="table-item">Software Engineer</td>
                      <td className="table-item">Excellent</td>
                      <td className="table-item">New York</td>
                      <td className="table-item">2025-01-05</td>
                      <td className="table-item">Pending</td>
                      <td className="table-item">
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>

                    <tr>
                      <td className="table-item pl-0">2025-01-01</td>
                      <td className="table-item">John Doe</td>
                      <td className="table-item">Online</td>
                      <td className="table-item">Software Engineer</td>
                      <td className="table-item">Excellent</td>
                      <td className="table-item">New York</td>
                      <td className="table-item">2025-01-05</td>
                      <td className="table-item">Pending</td>
                      <td className="table-item">
                        <button>Edit</button>
                        <button>Delete</button>
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
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{ customStyles }}
            contentLabel="Edit Application"
          >
            <div className="flex flex-row items-center justify-between px-[20px] pb-[10px] border-b-[2px] border-borderColor">
              <h1 className="header-main flex items-center gap-1">
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
                className="icon-style-small"
                fill="#5f6368"
                onClick={closeModal}
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>

            <form className="login-form flex w-fit flex-col">
              <div className="flex flex-wrap gap-10">
                <div className="login-input-container">
                  <label htmlFor="company_name" className="login-label">
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
                <div className="login-input-container">
                  <label htmlFor="company_web" className="login-label">
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
                <div className="login-input-container flex items-start min-w-[300px] ">
                  <label htmlFor="favorite" className="login-label ">
                    Favorite
                  </label>

                  <input
                    type="checkbox"
                    id="favorite"
                    name="favorite"
                    className="login-input mr-[8px]"
                  />
                </div>
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="application_date" className="login-label">
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
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="application_method" className="login-label">
                    Apply Method<em className="text-redText">*</em>
                  </label>
                  <Select
                    defaultValue={selectedMethod}
                    onChange={setMethodSelected}
                    options={methodOptions}
                    id="application_method"
                    name="application_method"
                    className="login-input modal-input p-[0px] outline-none active:outline-none"
                  />
                </div>
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="application_url" className="login-label">
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
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="position" className="login-label">
                    Position<em className="text-redText">*</em>
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    placeholder="Software Engineer"
                    className="login-input modal-input"
                  />
                </div>
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="location" className="login-label">
                    Location<em className="text-redText">*</em>
                  </label>
                  <Select
                    defaultValue={selectedLocation}
                    onChange={setLocationSelected}
                    options={locationOptions}
                    id="location"
                    name="location"
                    className="login-input modal-input p-[0px] outline-none active:outline-none"
                  />
                </div>
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="interview_date" className="login-label">
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
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="amount_offered" className="login-label">
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
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="rejected" className="login-label">
                    Rejected
                  </label>
                  <Select
                    defaultValue={selectedRejection}
                    onChange={setRejectedSelected}
                    options={rejectedOptions}
                    id="rejected"
                    name="rejected"
                    className="login-input modal-input p-[0px] outline-none active:outline-none"
                  />
                </div>
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="contact_name" className="login-label">
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
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="contact_email" className="login-label">
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
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="company_phone" className="login-label">
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
                <div className="login-input-container w-[1/3]">
                  <label htmlFor="notes" className="login-label">
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
              </div>

              <button
                type="submit"
                className="main-btn float-right mt-0"
                // onClick={(e) => submitAction(e)}
              >
                Create
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default EditApplications;
