import PropTypes from "prop-types";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import ApplicationsAPI from "../services/ApplicationsAPI";
import { format } from "date-fns";

const Dashboard = ({ userAuth }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userAuth) {
      const fetchApplications = async () => {
        try {
          const results = await ApplicationsAPI.getApplByUser(userAuth?.id);
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
    }
  }, [userAuth]);
  const totalApplications = applications.length;

  const activeApplications = applications.filter((app) => {
    return app.rejected === null;
  }).length;
  const rejectedApplications = applications.filter((app) => {
    return app.rejected !== null;
  }).length;
  const interviewedApplications = applications.filter((app) => {
    return app.interview_date !== null;
  }).length;
  return (
    <>
      <div className="container-main justify-center bg-[#f5f7f9]">
        <div className="content justify-center flex flex-col">
          <div className="flex-1">
            {userAuth && (
              <div className="flex-1">
                <div className="flex flex-col">
                  <div className="header-w-text">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon-style-large "
                        viewBox="0 -960 960 960"
                        fill="#16a34a"
                      >
                        <path d="M240-280h240v-80H240v80Zm120-160h240v-80H360v80Zm120-160h240v-80H480v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                      </svg>
                    </div>
                    <h1 className="header-main">Dashboard</h1>
                  </div>
                  <p className="header-text-desc mt-2">
                    Overview of your job application metrics.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col md:flex-row md:justify-between mt-16">
            <Card
              title="Total"
              total={totalApplications || 0}
              desc="applications submitted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#707280"
                className="icon-style-small"
              >
                <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
              </svg>
            </Card>
            <Card
              title="Active"
              total={activeApplications || 0}
              desc="applications in progress"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#10B981"
                className="icon-style-small"
              >
                <path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z" />
              </svg>
            </Card>
            <Card
              title="Rejected"
              total={rejectedApplications || 0}
              desc="applications rejected"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#ef4444"
                className="icon-style-small"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </Card>

            <Card
              title="Interviewed"
              total={interviewedApplications || 0}
              desc="applications interviewed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#5c97f8"
                className="icon-style-small"
              >
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880h320q33 0 56.5 23.5T880-800v320q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227v-320H480q-134 0-227 93t-93 227q0 134 93 227t227 93ZM280-360h280v-80l120 80v-240l-120 80v-80H280v240Zm200-120Z" />
              </svg>
            </Card>
          </div>

          <div className="flex-1 flex flex-col md:flex-row md:justify-between mt-16">
            <div className="w-[100%] border-[1px] border-borderColor flex flex-col p-[20px] rounded-md bg-[#ffffff]">
              <h5 className="!text-start card-header !mb-7">
                Recent Applicatons
              </h5>
              {applications.length === 0 ? (
                applications.map((app, index) => (
                  <div
                    className="flex flex-row justify-between mb-5"
                    key={index}
                  >
                    <div className="flex flex-col">
                      <p className="card-content">{app.company_name}</p>
                      <p className="card-desc">{app.position}</p>
                    </div>
                    <div className="flex flex-row items-center gap-5">
                      <div className="text-grayColor font-medium text-[12px] bg-[#dcfce7] rounded-xl py-[3px] px-[10px]">
                        {app.rejected ? "Rejected" : "Active"}
                      </div>
                      <div className="text-grayColor font-medium text-[12px] ">
                        {format(new Date(app.created_on), "do MMMM y")}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-secondaryText text-[14px] text-left">
                  No applications found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Dashboard.propTypes = {
  userAuth: PropTypes.object,
  applications: PropTypes.array,
};
export default Dashboard;
