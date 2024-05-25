import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const BackToMapEditMenu = () => {
  return (
    <Link style={{ width: "fit-content" }} to="/mapeditmenu">
      <div className={styles.SecondarySmallButton}>
        <i className="fi-sr-angle-left" />
        <p>Обратно в Редактирование карты</p>
      </div>
    </Link>
  );
};


