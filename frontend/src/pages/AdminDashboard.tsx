import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/feedbackDashboard.module.scss";
import { BASE_URL } from "../constants";
import Swal from "sweetalert2";
import { DateState, Feedback } from "../utils/states";
import Card from "../components/Card/Card";
import { checkAuth } from "../utils/helpers";
import Spinner from "../components/Spinner/Spinner";
const isLogged = checkAuth(false);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLogged) {
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
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
  const [_, setIsOpen] = useState<boolean>(false);

  //onclick and on change functions
  const onClick = async () => {
    if (startDate > endDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Start date cannot be after end date",
      });
      return;
    }
    setLoading(true);

    const { data } = await axios.get(`${BASE_URL}/api/feedback`, {
      params: {
        startDate,
        endDate,
      },
    });

    if (!data || data.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Could not find any data matching your dates",
      });
      setLoading(false);
    } else {
      setTimeout(() => {
        setFeedback(data);
        setLoading(false);
      }, 1000);
    }
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

  if (loading) return <Spinner />;

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
              key={feedback.id}
            >
              <Card feedback={feedback} active={false} modal={false} />
            </div>
          ))}
        {activeCardId && (
          <div className={styles.overlay} onClick={() => setActiveCardId(null)}>
            <dialog
              open={activeCardId ? true : false}
              className={`${styles.feedbackCard} ${styles.modal}`}
              key={activeCardId}
            >
              <form method="dialog">
                <div onClick={() => setIsOpen(false)}>
                  <Card
                    feedback={feedback.find((f) => f.id === activeCardId)!}
                    active={true}
                    modal={true}
                  />
                </div>
              </form>
            </dialog>
          </div>
        )}

        {/* {feedback &&
          feedback.map((feedback) => (
            <div
              className={styles.feedbackCard}
              onClick={() => handleCardClick(feedback.id)}
              key={feedback.id}
            >
              <Card feedback={feedback} active={false} modal={false} />
            </div>
          ))}
        {activeCardId && (
          <div className={styles.overlay} onClick={() => setActiveCardId(null)}>
            <div
              className={`${styles.feedbackCard} ${styles.modal}`}
              key={activeCardId}
            >
              <Card
                feedback={feedback.find((f) => f.id === activeCardId)!}
                active={true}
                modal={true}
              />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};
export default AdminDashboard;
