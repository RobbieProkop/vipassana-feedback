import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import user from "/user.png";
import logo from "/logo.png";

const Header: FC = () => {
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
        </div>
      </div>
    </header>
  );
};
export default Header;
