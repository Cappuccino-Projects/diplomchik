import styles from "./styles.module.css";

export const PlaceIcon = (props) => {
  return (
    <div className={styles.PlaceIconWrapper}>
      <img
        className={styles.PlaceIconImage}
        src={"../img/shop.png"}
      />
      <p className={styles.PlaceIconText}>{props.placeName}</p>
    </div>
  );
};
