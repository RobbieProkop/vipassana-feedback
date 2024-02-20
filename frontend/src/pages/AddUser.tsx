import { useState } from "react";
import styles from "../styles/feedbackForm.module.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";

const AddUser = () => {
  const navigate = useNavigate();
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

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formFilled = [username, email, password, confirmPassword].every(
      (value) => value !== ""
    );

    if (!formFilled) {
      Swal.fire({
        title: "Oops...",
        text: "Please fill out all fields",
        icon: "error",
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

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Oops...",
        text: "Passwords do not match",
        icon: "error",
      });
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/api/users`, formData);
      toast.success(data.message);
      navigate("/admin/users");
    } catch (error) {
      console.log("error :>> ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };
  const cancel = () => {
    navigate("/admin/users");
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

      <button className="btn btn-block" onClick={onSubmit}>
        Submit
      </button>
      <button className="btn btn-block btn-cancel" onClick={cancel}>
        Cancel
      </button>
    </div>
  );
};
export default AddUser;
