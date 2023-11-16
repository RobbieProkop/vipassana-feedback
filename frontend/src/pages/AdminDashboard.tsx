import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  let feedback;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }

    axios.get("/api/feedback").then((res) => {
      feedback = res.data;
      console.log("feedback", feedback);
    });
  }, []);
  if (!userInfo) {
    return <ErrorPage />;
  }
  return <div>Hi</div>;
};
export default AdminDashboard;
