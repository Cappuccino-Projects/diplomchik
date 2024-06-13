import styles from "./styles.module.css";
import { getIconPath } from "../../shared/api/getIconPath";

export const PlaceIcon = (props) => {
  return (
    <div className={styles.PlaceIconWrapper}>
      <img
        className={styles.PlaceIconImage}
        src={getIconPath(props.placeIcon)}
      />
      <p className={styles.PlaceIconText}>{props.placeName}</p>
    </div>
  );
};
