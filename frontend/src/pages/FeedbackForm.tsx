import { useState } from "react";
import styles from "../styles/feedbackForm.module.scss";

const FeedbackForm = () => {
  const today = new Date();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    courseStart: today.toISOString().split("T")[0],
    daysServed: 0,
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
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

  const onSubmit = () => {};

  return (
    <div className={styles.form}>
      <h1>Server Feedback</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.contact}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name (optional)</label>
            <input type="text" name="name" placeholder="Name" value={name} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email (optional)</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="course-start">Course Start Date *</label>
            <input
              type="date"
              name="course-start"
              placeholder="Course Start Date"
              value={courseStart}
              max={today.toISOString().split("T")[0]}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="days-served">Number Of Days Served *</label>
            <input
              type="number"
              name="days-served"
              min={0}
              value={daysServed}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question1">
            1. What was your motivation for coming to serve?
          </label>
          <textarea rows={10} name="question1" value={question1} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question2">2. Did you feel valued as a server?</label>
          <textarea rows={10} name="question2" value={question2} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question3">
            3. Are you against returning to Dhamma Karuna to serve again if your
            time and resources permit?
          </label>
          <p>If yes, please tell us why.</p>
          <textarea rows={10} name="question3" value={question3} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question4">
            4. What prevents you from serving more frequently?
          </label>

          <textarea rows={10} name="question4" value={question4} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question5" className={styles.ratings}>
            5. Please rate your overall experience in the following:{" "}
            <span>0-Poor 5-Exceptional</span>
          </label>
          <div className={styles.formGroupCheck}>
            <label htmlFor="Q1">- How well were you onboarded?</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              />
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              />
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>

          <div className={styles.formGroupCheck}>
            <label htmlFor="Question1">
              - Availability of required resources (tools, material etc.)
            </label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>

          <div className={styles.formGroupCheck}>
            <label htmlFor="Question1">- How was the food?</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>
          <div className={styles.formGroupCheck}>
            <label htmlFor="Question1">- Your overall experience</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>
          <div className={styles.formGroupCheck}>
            <label htmlFor="Question1">- How well were you onboarded?</label>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="additional">Additional Suggestions / Feedback:</label>
          <textarea rows={10} name="Additional Info" />
        </div>

        <button className="btn btn-block">Submit</button>
      </form>
    </div>
  );
};
export default FeedbackForm;
