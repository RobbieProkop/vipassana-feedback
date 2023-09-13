import styles from "../styles/home.module.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={styles.home}>
      <h2>404! Page Not Found!</h2>
      <Link to="/">
        <button className="btn btn-primary">
          <span>&#8592;</span> Go Back
        </button>
      </Link>
    </div>
  );
};
export default ErrorPage;
