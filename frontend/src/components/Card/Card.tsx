import { useNavigate } from "react-router-dom";
import { Feedback, User } from "../../utils/states";
import styles from "./card.module.scss";
import { FC } from "react";

// FeedbackCard component
const Card: FC<{
  feedback?: Feedback;
  active?: boolean;
  modal?: boolean;
  user?: User;
}> = ({ feedback, active, modal, user }) => {
  const navigate = useNavigate();
  if (feedback) {
    const {
      course_start_date,
      submitted_at,
      name,
      id,
      days_served,
      email,
      q1,
      q2,
      q3,
      q4,
      q5_1,
      q5_2,
      q5_3,
      q5_4,
      additional_info,
    } = feedback;

    const submitted = submitted_at.split("T")[0];

    return (
      <div
        id={feedback ? feedback.id.toString() : user ? user.id.toString() : ""}
        className={
          active
            ? `${styles.feedbackCard} ${styles.active}`
            : styles.feedbackCard
        }
      >
        <p>ID: {id}</p>
        <div className={styles.heading}>
          <h2>Name: {name || "Anonymous"}</h2>
          {active && <h3>Email: {email || ""}</h3>}
        </div>

        <h3>
          Course Start: <span>{course_start_date}</span>
        </h3>
        <h3>
          Submitted On: <span>{submitted}</span>
        </h3>

        {active && modal && (
          <div className={styles.detailedFeedback}>
            <h3>
              Days Served: <span>{days_served}</span>
            </h3>
            <h3>
              1. What was your motivation for coming to serve?:{" "}
              <span>{q1}</span>
            </h3>
            <h3>
              2. Did you feel valued as a server?: <span>{q2}</span>
            </h3>
            <h3>
              3. Are you against returning to serve again if your time and
              resources permit?: <span>{q3}</span>
            </h3>
            <h3>
              4. What prevents you from serving more frequently?:{" "}
              <span>{q4}</span>
            </h3>
            <h3>
              5. Please rate your overall experience in the following areas:
            </h3>
            <h3 className={styles.q5}>
              - How well were you onboarded?: <span>{q5_1}</span>
            </h3>
            <h3 className={styles.q5}>
              - Availability of required resources (tools, material etc.):{" "}
              <span>{q5_2}</span>
            </h3>
            <h3 className={styles.q5}>
              - How was the food?: <span>{q5_3}</span>
            </h3>
            <h3 className={styles.q5}>
              - Your overall experience: <span>{q5_4}</span>
            </h3>
            <h3>
              Additional: <span>{additional_info}</span>
            </h3>
            <button className="btn btn-cancel">Close</button>
          </div>
        )}
      </div>
    );
  } else if (user) {
    const { username, id, email, isAdmin } = user;
    const deleteConfirm = (id: number) => {
      navigate(`/admin/deleteUser/${id}`);
    };
    return (
      <div className={styles.feedbackCard}>
        <div className={styles.flex} onClick={() => deleteConfirm(id)}>
          <p>ID: {id}</p>
          <button className="btn btn-delete">X</button>
        </div>
        <div className={styles.heading}>
          <h2>Name: {username}</h2>
          <h3>Email: {email}</h3>
          <h3>Is Admin? {isAdmin ? "Yes" : "No"}</h3>
        </div>
      </div>
    );
  }
};

export default Card;
