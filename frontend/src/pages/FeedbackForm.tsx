import { useState } from "react";
import styles from "../styles/feedbackForm.module.scss";
import Swal from "sweetalert2";
import axios from "axios";

const FeedbackForm = () => {
  const today = new Date();

  interface Question5State {
    "question5-1": string;
    "question5-2": string;
    "question5-3": string;
    "question5-4": string;
  }

  interface FormDataState {
    name: string;
    email: string;
    courseStart: string;
    daysServed: number;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: Question5State;
    additional: string;
  }

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    courseStart: "",
    daysServed: 0,
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: {
      "question5-1": "",
      "question5-2": "",
      "question5-3": "",
      "question5-4": "",
    },
    additional: "",
  });

  const {
    name,
    email,
    courseStart,
    daysServed,
    question1,
    question2,
    question3,
    question4,
    question5,
  } = formData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("question5")) {
      setFormData((prevState) => ({
        ...prevState,
        question5: {
          ...prevState.question5,
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
    const formFilled = [
      courseStart,
      daysServed,
      question1,
      question2,
      question3,
      question4,
    ].every((value) => value !== "");
    const q5Selected = Object.values(question5).every((value) => value !== "");

    if (!formFilled || !q5Selected) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all required fields",
      });
      return;
    }

    const res = await axios.post("/api/feedback", formData);
    console.log("res :>> ", res);
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
          <label htmlFor="question1">
            1. What was your motivation for coming to serve? *
          </label>
          <textarea
            rows={10}
            name="question1"
            value={question1}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question2">
            2. Did you feel valued as a server? *
          </label>
          <textarea
            rows={10}
            name="question2"
            value={question2}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question3">
            3. Are you against returning to Dhamma Karuna to serve again if your
            time and resources permit? *
          </label>
          <p>If yes, please tell us why.</p>
          <textarea
            rows={10}
            name="question3"
            value={question3}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question4">
            4. What prevents you from serving more frequently? *
          </label>

          <textarea
            rows={10}
            name="question4"
            value={question4}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question5" className={styles.ratings}>
            5. Please rate your overall experience in the following:{" "}
            <span>0-Poor 5-Exceptional</span>
          </label>
          <div className={styles.formGroupCheck}>
            <label htmlFor="Q5-1">- How well were you onboarded? *</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-1"
                value="1"
                checked={question5["question5-1"] === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-1"
                value="2"
                checked={question5["question5-1"] === "2"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-1"
                value="3"
                checked={question5["question5-1"] === "3"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-1"
                value="4"
                checked={question5["question5-1"] === "4"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-1"
                value="5"
                checked={question5["question5-1"] === "5"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>

          <div className={styles.formGroupCheck}>
            <label htmlFor="Q5-2">
              - Availability of required resources (tools, material etc.) *
            </label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-2"
                value="1"
                checked={question5["question5-2"] === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-2"
                value="2"
                checked={question5["question5-2"] === "2"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-2"
                value="3"
                checked={question5["question5-2"] === "3"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-2"
                value="4"
                checked={question5["question5-2"] === "4"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-2"
                value="5"
                checked={question5["question5-2"] === "5"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>

          <div className={styles.formGroupCheck}>
            <label htmlFor="Q5-3">- How was the food? *</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-3"
                value="1"
                checked={question5["question5-3"] === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-3"
                value="2"
                checked={question5["question5-3"] === "2"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-3"
                value="3"
                checked={question5["question5-3"] === "3"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-3"
                value="4"
                checked={question5["question5-3"] === "4"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-3"
                value="5"
                checked={question5["question5-3"] === "5"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>
          <div className={styles.formGroupCheck}>
            <label htmlFor="Q5-4">- Your overall experience *</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-4"
                value="1"
                checked={question5["question5-4"] === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-4"
                value="2"
                checked={question5["question5-4"] === "2"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-4"
                value="3"
                checked={question5["question5-4"] === "3"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-4"
                value="4"
                checked={question5["question5-4"] === "4"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>

            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="question5-4"
                value="5"
                checked={question5["question5-4"] === "5"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="additional">Additional Suggestions / Feedback:</label>
          <textarea rows={10} name="Additional Info" onChange={handleChange} />
        </div>

        <button className="btn btn-block" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default FeedbackForm;
