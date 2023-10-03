import { FC } from "react";
import styles from "./footer.module.scss";
import { HeaderProps } from "../Header/Header";

const Footer: FC<HeaderProps> = ({ navOpen, setNavOpen }) => {
  const currentYear = new Date().getFullYear();

  const closeNav = () => {
    if (navOpen) setNavOpen(false);
  };
  return (
    <footer className={styles.footer} onClick={closeNav}>
      <div className={`container ${styles.container}`}>
        <p>Alberta Vipassana Foundation &copy; {currentYear}</p>
      </div>
    </footer>
  );
};
export default Footer;
