import PropTypes from "prop-types";

const Dashboard = ({ userAuth }) => {
  return (
    <>
      <div className="container-main justify-center bg-[#f5f7f9]">
        <div className="content justify-center flex lg:flex-row">
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
        </div>
      </div>
    </>
  );
};
Dashboard.propTypes = {
  userAuth: PropTypes.object,
};
export default Dashboard;
