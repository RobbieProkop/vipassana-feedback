import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);
  if (!userInfo) {
    return <ErrorPage />;
  }
  return <div>AdminDashboard</div>;
};
export default AdminDashboard;
