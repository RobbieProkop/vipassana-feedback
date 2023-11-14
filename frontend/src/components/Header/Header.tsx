import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import user from "/user.png";
import logo from "/logo.png";
import { USERS_URL } from "../../constants";
import axios from "axios";

export interface HeaderProps {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ navOpen, setNavOpen }) => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  const logout = async () => {
    console.log("logged out");
    localStorage.removeItem("userInfo");
    await axios.post(`${USERS_URL}/logout`);
    setNavOpen(false);
    navigate("/");
  };

  const closeNav = () => {
    if (navOpen) setNavOpen(false);
  };
  return (
    <header className={styles.header} onClick={closeNav}>
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
                  <Link to="/">Home</Link>
                </li>
                <li className={styles.link}>
                  <Link to="/admin/feedback">Dashboard</Link>
                </li>
                {userInfo.isAdmin && (
                  <li className={styles.link}>
                    <Link to="/admin/profiles">Users</Link>
                  </li>
                )}
                <li className={styles.link}>
                  <Link to="/profile">Profile</Link>
                </li>
                <li className={styles.link} onClick={logout}>
                  Logout
                </li>
              </ul>
            )}
          </nav>
        ) : (
          <nav>
            <Link className={styles.link} to="/login">
              <img
                src={user}
                alt="user Icon"
                className={styles.icon}
                loading="lazy"
              />
              Sign In
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
export default Header;
