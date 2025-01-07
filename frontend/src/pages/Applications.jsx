import { AuthenticatedContext } from "../context/AuthenticatedContext";
import { useContext } from "react";
const Applications = () => {
  const { user, isAuthenticated } = useContext(AuthenticatedContext);
  return (
    <>
      <div className="container-main justify-center bg-[#f5f7f9]">
        <div className="content">
          {isAuthenticated ? <h1>Application</h1> : <p>Not Authenticated</p>}
        </div>
      </div>
    </>
  );
};
export default Applications;
