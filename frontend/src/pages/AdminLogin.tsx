import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USERS_URL } from "../constants";
import Spinner from "../components/Spinner/Spinner";
import styles from "../styles/feedbackForm.module.scss";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  useEffect(() => {
    if (userInfo) {
      navigate("/admin/feedback");
    }
  }, [userInfo]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    if (!username || !password) return alert("Please fill all the fields");

    try {
      setLoading(true);
      setError(false);
      const { data } = await axios.post(`${USERS_URL}/login`, userData, {
        withCredentials: true,
      });
      toast.success(`Welcome ${data.username}`);
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/feedbackDashboard");
    } catch (error: any) {
      // alert(error.response.data.message);

      toast.error(
        error?.response?.data?.message || error?.data?.message || error.error
      );
      setError(true);
    }
    setLoading(false);
  };

  if (loading) return <Spinner />;
  return (
    <div className="container">
      <section className={styles.heading}>
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              className={
                error
                  ? `${styles.formControl} ${styles.errorControl}`
                  : styles.formControl
              }
              id="username"
              name="username"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <p className={error ? styles.error : styles.hidden}>
              Invalid Credentials
            </p>
          </div>

          <div className={styles.passwordInput}>
            <input
              type={!togglePassword ? "password" : "text"}
              className={
                error
                  ? `${styles.formControl} ${styles.errorControl}`
                  : styles.formControl
              }
              id="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div
              className={
                error
                  ? `${styles.passwordIcon} ${styles.errorControl}`
                  : styles.passwordIcon
              }
              onClick={() => setTogglePassword(!togglePassword)}
            >
              {!togglePassword && <FaEyeSlash />}
              {togglePassword && <FaEye />}
            </div>
          </div>
          <p className={error ? styles.error : styles.hidden}>
            Invalid Credentials
          </p>

          <div className={styles.formGroup}>
            <button className="btn btn-block" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default AdminLogin;
