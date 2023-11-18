import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/feedbackDashboard.module.scss";
import { BASE_URL } from "../constants";
import Swal from "sweetalert2";
import { DateState, Feedback } from "../utils/states";
import Card from "../components/Card/Card";
import { checkAuth } from "../utils/helpers";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(navigate);
  }, []);

  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  //states
  const [formData, setFormData] = useState<DateState>({
    startDate: "",
    endDate: today,
  });
  const { startDate, endDate } = formData;

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  //for card active state
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  //onclick and on change functions
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

    const { data } = await axios.get(`${BASE_URL}/api/feedback`, {
      params: {
        startDate,
        endDate,
      },
    });
    setFeedback(data);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle Card Active State Click
  const handleCardClick = (id: number) => {
    if (activeCardId === id) {
      setActiveCardId(null);
    } else {
      setActiveCardId(id);
    }
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
      <div className={styles.grid}>
        {feedback &&
          feedback.map((feedback) => (
            <div
              className={styles.feedbackCard}
              onClick={() => handleCardClick(feedback.id)}
            >
              <Card
                key={feedback.id}
                feedback={feedback}
                active={false}
                modal={false}
              />
            </div>
          ))}
        {activeCardId && (
          <div className={styles.overlay} onClick={() => setActiveCardId(null)}>
            <div
              className={`${styles.feedbackCard} ${styles.modal}`}
              key={activeCardId}
            >
              {/* <button onClick={() => setActiveCardId(null)}>X</button> */}
              <Card
                feedback={feedback.find((f) => f.id === activeCardId)!}
                active={true}
                modal={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminDashboard;
