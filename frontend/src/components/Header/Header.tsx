import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import user from "/user.png";
import logo from "/logo.png";
import { USERS_URL } from "../../constants";
import axios from "axios";

const Header: FC = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  const [navOpen, setNavOpen] = useState<boolean>(false);

  const logout = async () => {
    console.log("logged out");
    localStorage.removeItem("userInfo");
    await axios.post(`${USERS_URL}/logout`);
    navigate("/");
  };
  useEffect(() => {}, [userInfo, logout]);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.flexBetween}>
          <Link className={styles.link} to="/">
            <img
              src={logo}
              alt="Vipassana Logo"
              className={styles.logo}
              loading="lazy"
            />
          </Link>
          {userInfo ? (
            <nav className={styles.menu}>
              <div onClick={() => setNavOpen(!navOpen)}>
                <img
                  src={user}
                  alt="user Icon"
                  className={styles.icon}
                  loading="lazy"
                />
                <p className={styles.name}>{userInfo.username}</p>
                <p className={navOpen ? styles.arrowOpen : styles.arrow}>
                  &#x5e;
                </p>
              </div>
              {navOpen && (
                <ul>
                  <li className={styles.link}>
                    <Link to="/admin/profile">Profile</Link>
                  </li>
                  <li className={styles.link} onClick={logout}>
                    Logout
                  </li>
                </ul>
              )}
            </nav>
          ) : (
            <div>
              <Link className={styles.link} to="/login">
                <img
                  src={user}
                  alt="user Icon"
                  className={styles.icon}
                  loading="lazy"
                />
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
