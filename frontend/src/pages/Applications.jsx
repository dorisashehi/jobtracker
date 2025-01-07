import { AuthenticatedContext } from "../context/AuthenticatedContext";
import { useContext } from "react";
const Applications = () => {
  const { user, isAuthenticated } = useContext(AuthenticatedContext);
  return (
    <>
      <div className="container-main justify-center bg-[#f5f7f9]">
        <div className="content justify-center flex lg:flex-col">
          <div className="flex-1">
            {isAuthenticated ? (
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
            ) : (
              <p>Not Authenticated</p>
            )}
          </div>

          <div className="flex-1 py-10 flex flex-col">
            <button
              type="submit"
              className="main-btn float-right mt-0 max-w-fit mb-5 flex flex-row justify-center capitalize"
            >
              <p>Log In</p>
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
        </div>
      </div>
    </>
  );
};
export default Applications;
