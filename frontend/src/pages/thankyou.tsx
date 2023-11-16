import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/thankyou.module.scss";

const thankyou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);
  return (
    <div className="container">
      <div className={styles.flexCenter}>
        <h1>Thank you for your feedback!</h1>
      </div>
    </div>
  );
};
export default thankyou;
