import { PlaceIcon } from "@components/PlaceIcon";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const placesWrapper = (props) => {
  return (
    <div className={styles.placesBlock}>
      <div className={styles.BlockTitleWrapper}>
        <p className={styles.BlockTitleText}>{props.WrapperText}</p>
        {props.WrapperButtonEnabled && (
          <Link to="/allplaces">
            <div className={styles.AllplacesButton}>Все места</div>
          </Link>
        )}
      </div>

      <div className={styles.placesWrapper}>
        {this.props.places?.map((CurrentPlace) => (
          <PlaceIcon key={CurrentPlace.id} place={CurrentPlace} />
        ))}
      </div>
    </div>
  );
};

