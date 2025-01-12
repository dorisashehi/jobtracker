import PropTypea from "prop-types";
import { format } from "date-fns";

const ApplicationsTable = ({ applications, openModal }) => {
  return (
    <table className="table-design">
      <thead className="uppercase border-[1.5px] border-borderColor">
        <tr>
          <th className="table-head"></th>
          <th className="table-head">Date</th>
          <th className="table-head">Name</th>
          <th className="table-head">Favorite</th>
          <th className="table-head">Method</th>
          <th className="table-head">Position</th>
          <th className="table-head">Location</th>
          <th className="table-head">Interview</th>
          <th className="table-head">Offer</th>
          <th className="table-head">Rejected</th>
          <th className="table-head">Action</th>
        </tr>
      </thead>

      <tbody>
        {Array.from(applications)?.map((application) => {
          const applyDate = format(
            new Date(application.apply_date),
            "do MMMM Y"
          );
          const interviewDate = format(
            new Date(application.interview_date),
            "do MMMM Y"
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
                  >
                    <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                  </svg>
                </td>
                <td className="table-item">{applyDate}</td>
                <td className="table-item">{application.company_name}</td>
                <td className="table-item">{application.favorite}</td>
                <td className="table-item">{application.method}</td>
                <td className="table-item">{application.position}</td>
                <td className="table-item">{application.location}</td>
                <td className="table-item">{interviewDate}</td>
                <td className="table-item">{application.offer_amount}</td>
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
