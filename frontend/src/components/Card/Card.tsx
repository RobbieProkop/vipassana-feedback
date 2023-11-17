import { Link } from "react-router-dom";
import { Feedback } from "../../utils/states";
import styles from "./card.module.scss";

// FeedbackCard component
const Card: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  const { course_start_date, submitted_at, name } = feedback;

  const submitted = submitted_at.split("T")[0];

  return (
    <Link to={`/feedback/${feedback.id}`}>
      <div className={styles.feedbackCard}>
        <h2>Name: {name || "Anonymous"}</h2>
        <h3>Course Start Date: {course_start_date}</h3>
        <h3>Submitted On: {submitted}</h3>
      </div>
    </Link>
  );
};

export default Card;
