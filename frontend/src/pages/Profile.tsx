import { useState } from "react";
import styles from "../styles/feedbackForm.module.scss";

const Profile = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;
  interface FormDataState {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    isAdmin?: boolean;
  }

  const [formData, setFormData] = useState<FormDataState>({
    name: userInfo.name,
    email: userInfo.email,
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1>Profile</h1>

      <form>
        <div className={styles.form}>
          <div className={styles.contact}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name (optional)</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email (optional)</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Profile;
