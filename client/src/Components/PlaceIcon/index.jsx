import styles from "./styles.module.css";

export const PlaceIcon = (props) => {
  return (
    <div className={styles.PlaceIconWrapper}>
      <img
        className={styles.PlaceIconImage}
        src={"../img/" + props.place.PlaceImage}
      />
      <p className={styles.PlaceIconText}>{props.place.name}</p>
    </div>
  );
};
