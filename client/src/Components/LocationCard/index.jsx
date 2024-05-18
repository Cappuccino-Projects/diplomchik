import styles from "./styles.module.css";

export const LocationCard = (props) => {
  return (
    <div className={styles.LocationCard}>
      <div className={styles.LocationCardTitleWrapper}>
        <div className={styles.LocationCardNameRatingWrapper}>
          <b className={styles.LocationCardName}>{props.location.PlaceName}</b>
          <p className={styles.LocationCardRating}>
            {"★ " + props.location.PlaceRating}
          </p>
        </div>
        <div className={styles.CardEditButton}>
          <p>Ред.</p>
          <i className="fi fi-sr-edit" />
        </div>
      </div>
      <b className={styles.LocationCardName}>{props.location.PlaceType}</b>
      <b className={styles.LocationCardName}>{props.location.PlaceAddress}</b>

      <p className="LocationCardInfo">{props.location.PlaceInfo}</p>
      <div className={styles.LocationCardImageWrapper}>
        <img
          src={"../img/" + props.location.PlaceImage}
          className={styles.LocationCardImage}
        ></img>
        <img
          src={"../img/" + props.location.PlaceImage}
          className={styles.LocationCardImage}
        ></img>
        <img
          src={"../img/" + props.location.PlaceImage}
          className={styles.LocationCardImage}
        ></img>
      </div>
    </div>
  );
};
