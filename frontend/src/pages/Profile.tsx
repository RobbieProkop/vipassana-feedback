import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "../styles/feedbackForm.module.scss";
import profile from "../styles/profile.module.scss";
import axios from "axios";
import { USERS_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { checkAuth } from "../utils/helpers";

const Profile = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;
  useEffect(() => {
    if (!checkAuth(false)) {
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
  }, []);
  if (!userInfo) {
    return <ErrorPage />;
  }

  interface FormDataState {
    username: string;
    email: string;
    prevPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    isAdmin?: boolean;
  }

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataState>({
    username: userInfo.username,
    email: userInfo.email,
    prevPassword: "",
    newPassword: "",
    confirmPassword: "",
    isAdmin: userInfo.isAdmin,
  });

  const { username, email, prevPassword, newPassword, confirmPassword } =
    formData;

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
        text: "All fields are required!",
      });
      return;
    }

    const usernameRegex = /\s/;
    const emailRegex = /\S+@\S+\.\S+/;

    if (usernameRegex.test(username)) {
      Swal.fire({
        title: "Oops...",
        text: "Username cannot contain spaces",
        icon: "error",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Oops...",
        text: "Please enter a valid email",
        icon: "error",
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

  const onSubmitPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formFilled = [prevPassword, newPassword, confirmPassword].every(
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
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      const res = await axios.put(`${USERS_URL}/pass`, formData, {
        withCredentials: true,
      });
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

      {!editProfile && !editPassword && (
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
          <div className={profile.buttons}>
            <button
              className="btn  btn-primary"
              onClick={() => setEditPassword(true)}
            >
              Update Password
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setEditProfile(true)}
            >
              Edit Profile
            </button>
          </div>
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
          </div>
        </form>
      )}
      {editPassword && (
        <form>
          <div className={styles.form}>
            <div className={styles.contact}>
              <div className={styles.formGroup}>
                <label htmlFor="password">Previous Password</label>
                <input
                  type="password"
                  name="prevPassword"
                  placeholder="Enter Previous Password"
                  value={prevPassword}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter New Password"
                  value={newPassword}
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
            </div>
          </div>
          <div className={profile.buttons}>
            <button
              className="btn  btn-cancel"
              onClick={() => setEditPassword(false)}
            >
              Cancel
            </button>
            <button className="btn " onClick={onSubmitPassword}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default Profile;
