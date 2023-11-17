import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import styles from "../styles/feedbackDashboard.module.scss";
import { BASE_URL } from "../constants";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const navigate = useNavigate();

  interface datesState {
    startDate: string;
    endDate: string;
  }

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  let feedback;

  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const [formData, setFormData] = useState<datesState>({
    startDate: "",
    endDate: today,
  });
  const { startDate, endDate } = formData;

  const onClick = async () => {
    if (!startDate || !endDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a start & end date",
      });
      return;
    }
    if (startDate > endDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Start date cannot be after end date",
      });
      return;
    }

    feedback = await axios.get(`${BASE_URL}/api/feedback`, {
      params: {
        startDate,
        endDate,
      },
    });
    console.log("feedback", feedback);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="container">
      <h2>Retrieve Feedback Within Specified Period</h2>
      <div className={styles.dates}>
        <div className="formGroup">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={onChange}
            max={today}
          />
        </div>
        <div className="formGroup">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={onChange}
            max={today}
          />
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
