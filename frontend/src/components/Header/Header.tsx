import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import user from "/user.png";
import logo from "/logo.png";

const Header: FC = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  useEffect(() => {}, [userInfo]);
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
            <ul>
              <li>
                <Link className={styles.link} to="/admin/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
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
