import { AuthenticatedContext } from "../context/AuthenticatedContext";
import { useContext } from "react";

const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AuthenticatedContext);

  return (
    <>
      <div className="container-main justify-center bg-[#f5f7f9]">
        <div className="content">
          {isAuthenticated ? (
            Object.keys(user)?.length > 0 && (
              <div className="login-input-container">
                <p>id: {user?.id}</p>
                <p>username: {user?.username}</p>
                <p>email: {user?.email}</p>
              </div>
            )
          ) : (
            <p>Not Authenticated</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
