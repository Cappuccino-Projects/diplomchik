import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const BackToMainMenu = () => {
  return (
    <Link style={{ width: "fit-content" }} to="/mainmenu">
      <div className={styles.SecondarySmallButton}>
        <i className="fi-sr-angle-left" />
        <p>Обратно в меню</p>
      </div>
    </Link>
  );
};


