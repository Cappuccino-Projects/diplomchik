import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const Search = () => {
  return (
    <div className={styles.Search}>
      <textarea placeholder="Куда отправимся?" className={styles.SearchBox}></textarea>
      <Link to="/chat">
        <div className={styles.SearchButton}>
          <i className="fi fi-sr-search"></i>
        </div>
      </Link>
    </div>
  );
};
