import axios from "axios";
import styles from "../styles/home.module.scss";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants";

const Home = () => {
  const serverConnected = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/heartbeat`);
    console.log("Connected to database?? ", data);
  };

  return (
    <div className={styles.home}>
      <h2>Server Feedback</h2>
      <Link to="/feedback" onClick={serverConnected}>
        <button className={`btn btn-primary ${styles.button}`}>
          Submit Feedback
        </button>
      </Link>
    </div>
  );
};

export default Home;
