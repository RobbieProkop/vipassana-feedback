import { useState } from "react";
import Swal from "sweetalert2";
import styles from "../styles/feedbackForm.module.scss";
import axios from "axios";

const Profile = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;
  interface FormDataState {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    isAdmin?: boolean;
  }

  const [formData, setFormData] = useState<FormDataState>({
    username: userInfo.username,
    email: userInfo.email,
    password: userInfo.password,
    confirmPassword: "",
    isAdmin: userInfo.isAdmin,
  });

  const { username, email, password, confirmPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formFilled = [username, email].every((value) => value !== "");
    if (!formFilled) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username and Email are required!",
      });
      return;
    }

    try {
      const res = await axios.put("/api/users/profile", formData);
      console.log("res :>> ", res);
    } catch (error) {
      console.log("error :>> ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  return (
    <div className="container">
      <h1>Profile</h1>

      <form>
        <div className={styles.form}>
          <div className={styles.contact}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Update Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value=""
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-block" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Profile;
