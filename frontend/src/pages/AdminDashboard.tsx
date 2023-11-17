import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import styles from "../styles/feedbackDashboard.module.scss";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  let feedback;

  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

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

  const onClick = () => {};
  return (
    <div className="container">
      <h2>Retrieve Feedback Within Specified Period</h2>
      <div className={styles.dates}>
        <div className="formGroup">
          <label>Start Date</label>
          <input type="date" />
        </div>
        <div className="formGroup">
          <label>End Date</label>
          <input type="date" value={today} />
        </div>
      </div>
      <div className={styles.button}>
        <button onClick={onClick} className="btn btn-block">
          Retrieve Feedback
        </button>
      </div>
    </div>
  );
};
export default AdminDashboard;
