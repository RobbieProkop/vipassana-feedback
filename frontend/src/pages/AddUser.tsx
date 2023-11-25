import { useState } from "react";
import styles from "../styles/feedbackForm.module.scss";

const AddUser = () => {
  interface FormDataState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
  }

  const [formData, setFormData] = useState<FormDataState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const { username, email, password, confirmPassword, isAdmin } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.form}>
      <h1>Add User</h1>

      <form>
        <div className={styles.formGroup}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
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
            placeholder="Enter Password"
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
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div
          className={styles.checkbox}
          onClick={() =>
            setFormData((prevState) => ({
              ...prevState,
              ["isAdmin"]: !isAdmin,
            }))
          }
        >
          <label htmlFor="isAdmin">Is Admin?</label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={isAdmin}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};
export default AddUser;
