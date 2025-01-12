import PropTypea from "prop-types";
import { format } from "date-fns";

const ApplicationsTable = ({ applications, openModal }) => {
  const openMenu = (menuId) => {
    console.log(menuId);
  };
  return (
    <table className="table-design">
      <thead className="uppercase border-[1.5px] border-borderColor">
        <tr>
          <th className="table-head"></th>
          <th className="table-head">Date</th>
          <th className="table-head">Name</th>
          <th className="table-head">Favorite</th>
          <th className="table-head">Position</th>
          <th className="table-head">Location</th>
          <th className="table-head">Rejected</th>
          <th className="table-head">Action</th>
        </tr>
      </thead>

      <tbody>
        {Array.from(applications)?.map((application) => {
          const applyDate = format(
            new Date(application.apply_date),
            "do MMMM y"
          );
          return (
            <>
              <tr key={application.id}>
                <td className="table-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#5f6368"
                    className="icon-style-small"
                    onClick={() => openMenu(application.id)}
                  >
                    <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                  </svg>
                  <ul className="absolute bg-[#FFFFFF] p-[5px] z-10">
                    <li>Edit</li>
                    <li>Delete</li>
                  </ul>
                </td>
                <td className="table-item">{applyDate}</td>
                <td className="table-item">{application.company_name}</td>
                <td className="table-item">
                  {application.favorite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                    </svg>
                  ) : (
                    <svg
                      fill="#e4696d"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12,20.9996 L3.847,13.2406 C2.656,12.1076 2,10.5986 2,8.9916 C2,7.3846 2.656,5.8756 3.847,4.7416 C6.067,2.6286 9.552,2.4386 12,4.1686 C14.448,2.4386 17.933,2.6286 20.153,4.7416 C21.344,5.8756 22,7.3846 22,8.9916 C22,10.5986 21.344,12.1076 20.153,13.2406 L12,20.9996 Z"
                      />
                    </svg>
                  )}
                </td>
                <td className="table-item">{application.position}</td>
                <td className="table-item">{application.location}</td>

                <td className="table-item">{application.rejected}</td>
                <td className="table-item">
                  <button
                    onClick={() => openModal("view")}
                    className="main-btn bg-lightGreen"
                  >
                    View
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

ApplicationsTable.propTypes = {
  applications: PropTypea.array,
  openModal: PropTypea.func,
};
export default ApplicationsTable;
