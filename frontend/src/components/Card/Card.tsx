import { Feedback } from "../../utils/states";
import styles from "./card.module.scss";
import { FC, useState } from "react";

// FeedbackCard component
const Card: FC<{ feedback: Feedback }> = ({ feedback }) => {
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
  } = feedback;

  const submitted = submitted_at.split("T")[0];

  const [active, setActive] = useState<boolean>(false);

  return (
    <div className={styles.feedbackCard} onClick={() => setActive(!active)}>
      {/* <Link to={`/feedback/${feedback.id}`} className={styles.link}> */}
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

      {active && (
        <div className={styles.detailedFeedback}>
          <h3>
            Days Served: <span>{days_served}</span>
          </h3>
          <h3>
            1. What was your motivation for coming to serve?: <span>{q1}</span>
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
          <h3>
            - How well were you onboarded?: <span>{q5_1}</span>
          </h3>
          <h3>
            - Availability of required resources (tools, material etc.):{" "}
            <span>{q5_2}</span>
          </h3>
          <h3>
            - How was the food?: <span>{q5_3}</span>
          </h3>
          <h3>
            - Your overall experience: <span>{q5_4}</span>
          </h3>
        </div>
      )}
      {/* </Link> */}
    </div>
  );
};

export default Card;