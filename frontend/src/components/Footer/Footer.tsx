import { FC } from "react";
import styles from "./footer.module.scss";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <p>Alberta Vipassana Foundation &copy; {currentYear}</p>
        <p>
          <a href="https://dhammadevs.com">DhammaDevs</a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
