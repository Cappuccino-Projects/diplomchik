import { LocationCard } from "@components/LocationCard";
import styles from "./styles.module.css";

export const LocationsWrapper = (props) => {
  return (
    <div className={styles.CardsWrapper}>
      {this.props.locations?.map((CurrentLocation) => (
        <LocationCard
          key={CurrentLocation.PlaceId}
          location={CurrentLocation}
        />
      ))}
    </div>
  );
};
