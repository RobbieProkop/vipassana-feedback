import { useState } from "react";
import Swal from "sweetalert2";
import styles from "../styles/feedbackForm.module.scss";
import profile from "../styles/profile.module.scss";
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

  const [editProfile, setEditProfile] = useState<boolean>(false);

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
    const formFilled = [username, email, password, confirmPassword].every(
      (value) => value !== ""
    );
    if (!formFilled) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
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

      {!editProfile && (
        <div className={profile.profile}>
          <div className={profile.profileGroup}>
            <label htmlFor="name">Username</label>
            <p>{username}</p>
          </div>
          <div className={profile.profileGroup}>
            <label htmlFor="email">Email</label>
            <p>{email}</p>
          </div>
          <div className={profile.profileGroup}>
            <label htmlFor="password">Password</label>
            <p>********</p>
          </div>

          <button
            className="btn btn-block"
            onClick={() => setEditProfile(true)}
          >
            Edit Profile
          </button>
        </div>
      )}

      {editProfile && (
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
                  value=""
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={profile.buttons}>
            <button
              className="btn  btn-cancel"
              onClick={() => setEditProfile(false)}
            >
              Cancel
            </button>
            <button className="btn " onClick={onSubmit}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default Profile;
