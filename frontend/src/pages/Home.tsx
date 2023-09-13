import styles from "../styles/home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.home}>
      <h2>Server Feedback</h2>
      <Link to="/feedback">
        <button className={`btn btn-primary ${styles.button}`}>
          Submit Feedback
        </button>
      </Link>
    </div>
  );
};

export default Home;
