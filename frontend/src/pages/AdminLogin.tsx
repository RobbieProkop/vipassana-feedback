import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    await axios.post("/api/users/login", userData);
    // dispatch(login(userData));
  };

  return (
    <div className="container">
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group password-input">
            <input
              type={!togglePassword ? "password" : "text"}
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              className="password-icon"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              {!togglePassword && <FaEyeSlash />}
              {togglePassword && <FaEye />}
            </div>
          </div>
          <div className="form-group">
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
