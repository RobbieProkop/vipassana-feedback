import { useState } from "react";
import styles from "../styles/feedbackForm.module.scss";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const today = new Date();

  interface Question5State {
    q5_1: string;
    q5_2: string;
    q5_3: string;
    q5_4: string;
  }

  interface FormDataState {
    name: string;
    email: string;
    courseStart: string;
    daysServed: number;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: Question5State;
    additional: string;
  }

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    courseStart: "",
    daysServed: 0,
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: {
      q5_1: "",
      q5_2: "",
      q5_3: "",
      q5_4: "",
    },
    additional: "",
  });

  const {
    name,
    email,
    courseStart,
    daysServed,
    q1,
    q2,
    q3,
    q4,
    q5,
    additional,
  } = formData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("q5")) {
      setFormData((prevState) => ({
        ...prevState,
        q5: {
          ...prevState.q5,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formFilled = [courseStart, daysServed, q1, q2, q3, q4].every(
      (value) => value !== ""
    );
    const q5Selected = Object.values(q5).every((value) => value !== "");

    if (!formFilled || !q5Selected) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all required fields",
      });
      return;
    }

    await axios.post("http://localhost:8080/api/feedback", formData);
    navigate("/feedback/thankyou");
  };

  return (
    <div className={styles.form}>
      <h1>Server Feedback</h1>
      <p className={styles.required}>* indicates field is required</p>
      <form>
        <div className={styles.contact}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name (optional)</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email (optional)</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="course-start">Course Start Date *</label>
            <input
              type="date"
              name="courseStart"
              placeholder="Course Start Date"
              value={courseStart}
              max={today.toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="days-served">Number Of Days Served *</label>
            <input
              type="number"
              name="daysServed"
              min={0}
              value={daysServed}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="q1">
            1. What was your motivation for coming to serve? *
          </label>
          <textarea rows={10} name="q1" value={q1} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="q2">2. Did you feel valued as a server? *</label>
          <textarea rows={10} name="q2" value={q2} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="q3">
            3. Are you against returning to Dhamma Karuna to serve again if your
            time and resources permit? *
          </label>
          <p>If yes, please tell us why.</p>
          <textarea rows={10} name="q3" value={q3} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="q4">
            4. What prevents you from serving more frequently? *
          </label>

          <textarea rows={10} name="q4" value={q4} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="q5" className={styles.ratings}>
            5. Please rate your overall experience in the following:{" "}
            <span>0-Poor 5-Exceptional</span>
          </label>
          <div className={styles.formGroupCheck}>
            <label>- How well were you onboarded? *</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_1"
                value="1"
                checked={q5["q5_1"] === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label">1</label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_1"
                value="2"
                checked={q5["q5_1"] === "2"}
                onChange={handleChange}
              />
              <label className="form-check-label">2</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_1"
                value="3"
                checked={q5["q5_1"] === "3"}
                onChange={handleChange}
              />
              <label className="form-check-label">3</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_1"
                value="4"
                checked={q5["q5_1"] === "4"}
                onChange={handleChange}
              />
              <label className="form-check-label">4</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_1"
                value="5"
                checked={q5["q5_1"] === "5"}
                onChange={handleChange}
              />
              <label className="form-check-label">5</label>
            </div>
          </div>

          <div className={styles.formGroupCheck}>
            <label>
              - Availability of required resources (tools, material etc.) *
            </label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_2"
                value="1"
                checked={q5["q5_2"] === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label">1</label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_2"
                value="2"
                checked={q5["q5_2"] === "2"}
                onChange={handleChange}
              />
              <label className="form-check-label">2</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_2"
                value="3"
                checked={q5["q5_2"] === "3"}
                onChange={handleChange}
              />
              <label className="form-check-label">3</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_2"
                value="4"
                checked={q5["q5_2"] === "4"}
                onChange={handleChange}
              />
              <label className="form-check-label">4</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_2"
                value="5"
                checked={q5["q5_2"] === "5"}
                onChange={handleChange}
              />
              <label className="form-check-label">5</label>
            </div>
          </div>

          <div className={styles.formGroupCheck}>
            <label>- How was the food? *</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_3"
                value="1"
                checked={q5["q5_3"] === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label">1</label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_3"
                value="2"
                checked={q5["q5_3"] === "2"}
                onChange={handleChange}
              />
              <label className="form-check-label">2</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_3"
                value="3"
                checked={q5["q5_3"] === "3"}
                onChange={handleChange}
              />
              <label className="form-check-label">3</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_3"
                value="4"
                checked={q5["q5_3"] === "4"}
                onChange={handleChange}
              />
              <label className="form-check-label">4</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_3"
                value="5"
                checked={q5["q5_3"] === "5"}
                onChange={handleChange}
              />
              <label className="form-check-label">5</label>
            </div>
          </div>
          <div className={styles.formGroupCheck}>
            <label>- Your overall experience *</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_4"
                value="1"
                checked={q5["q5_4"] === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label">1</label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_4"
                value="2"
                checked={q5["q5_4"] === "2"}
                onChange={handleChange}
              />
              <label className="form-check-label">2</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_4"
                value="3"
                checked={q5["q5_4"] === "3"}
                onChange={handleChange}
              />
              <label className="form-check-label">3</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_4"
                value="4"
                checked={q5["q5_4"] === "4"}
                onChange={handleChange}
              />
              <label className="form-check-label">4</label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="q5_4"
                value="5"
                checked={q5["q5_4"] === "5"}
                onChange={handleChange}
              />
              <label className="form-check-label">5</label>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="additional">Additional Suggestions / Feedback:</label>
          <textarea
            rows={10}
            name="additional"
            value={additional}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-block" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default FeedbackForm;
