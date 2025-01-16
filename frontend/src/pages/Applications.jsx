import { AuthenticatedContext } from "../context/AuthenticatedContext";
import { useContext, useState, useEffect } from "react";
import ApplicationsTable from "./ApplicationsTable";
import ApplicationsAPI from "../services/ApplicationsAPI";
import ModalHeader from "../components/ModalHeader";
import ApplicationsForm from "./ApplicationsForm";
// import CreateModal from "./CreateModal";
import Button from "../components/Button";
import Header from "../components/Header";
import Spiner from "../components/Spiner";
import Modal from "react-modal";

const Applications = () => {
  const { user, isAuthenticated } = useContext(AuthenticatedContext);
  const [applications, setApplications] = useState([]);
  const [crFormData, setCrFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const fetchApplications = async () => {
        try {
          const results = await ApplicationsAPI.getApplByUser(user.id);
          if (results.length > 0) {
            setApplications(results);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchApplications();
      setCrFormData({ ...crFormData, user_id: user.id }); //user id of authenticated user
    }
  }, [isAuthenticated, user?.id]);

  const filteredApplications = applications.filter((application) => {
    if (searchText === "") return application;
    return (
      application.company_name?.toLowerCase().includes(searchText) ||
      application.position?.toLowerCase().includes(searchText) ||
      application.location?.toLowerCase().includes(searchText)
    );
  });

  const handleSearchText = (text) => {
    setTimeout(() => {
      setSearchText(text);
    }, 400);
  };

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

  return (
    <>
      <div className="container-main justify-center bg-[#f5f7f9]">
        <div className="content justify-center flex lg:flex-col">
          {loading ? (
            <Spiner />
          ) : (
            <>
              <Header
                title="Applications"
                desc="Manage all of your job applications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-style-large"
                  viewBox="0 -960 960 960"
                  fill="text-black"
                >
                  <path d="M240-280h240v-80H240v80Zm120-160h240v-80H360v80Zm120-160h240v-80H480v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                </svg>
              </Header>

              <div className="flex-1 filter-bar">
                <Button title="Create" onClickAct={() => openModal("creation")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-style-small fill-[#FFFFFF]"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                </Button>
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
                      className="search-input"
                      value={searchText}
                      onChange={(e) => handleSearchText(e.target.value)}
                      placeholder="Search by company name, position, or location"
                    />
                  </div>
                  {/* <Button title="Export">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      className="icon-style-small fill-[#FFFFFF]"
                    >
                      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h200v80H160v480h640v-480H600v-80h200q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-184L280-544l56-56 104 104v-304h80v304l104-104 56 56-200 200Z" />
                    </svg>
                  </Button> */}
                </div>
              </div>
              <div className="flex-1">
                <ApplicationsTable
                  openModal={openModal}
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                  setApplications={setApplications}
                  filteredApplications={filteredApplications}
                  itemsPerPage={5}
                />
              </div>
            </>
          )}
          <Modal
            isOpen={modalIsOpen.creation}
            onRequestClose={() => closeModal("creation")}
            contentLabel="Create Application"
          >
            <div className="modal-container">
              <ModalHeader
                title="Application Details"
                onClose={() => closeModal("creation")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="icon-style-large"
                  fill="#5f6368"
                >
                  <path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z" />
                </svg>
              </ModalHeader>
            </div>
            <ApplicationsForm
              crFormData={crFormData}
              setCrFormData={setCrFormData}
              closeModal={closeModal}
              setApplications={setApplications}
            ></ApplicationsForm>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default Applications;
