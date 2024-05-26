import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { useGetAllplaceTypesQuery } from '../../app/redux/services/placeTypeApi';
// import { PlaceIcon } from '@components/PlaceIcon';

export const AllPlacesWrapper = (props) => {
  const { data: placeTypes, isLoading, error } = useGetAllplaceTypesQuery();
  const [selectedType, setSelectedType] = useState('');
	const [filterChosen, setFilterChosen] = useState(false);

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;

const filteredPlaces = props.places?.filter(place => selectedType === null || String(place.typeId) === String(selectedType));
console.log('props.places:', props.places);
console.log('selectedType:', selectedType);
console.log('filteredPlaces:', filteredPlaces);



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

<div>

<div className="placesBlock">
    <div className="BlockTitleWrapper">
      <h2 className="BlockTitleText">Места</h2>
      <button className="AllplacesButton" onClick={() => {setSelectedType(null); setFilterChosen(true);}}>
        All
      </button>
    </div>

    <div className="placesWrapper">
      {placeTypes?.map(type => (
        <button key={type.id} className="AllplacesButton" onClick={() => {setSelectedType(type.id); setFilterChosen(true);}}>
          {type.name}
        </button>
      ))}
    </div>
</div>

</div>


<div className={styles.placesWrapper} style={{ display: 'block'}}>
  {filterChosen && filteredPlaces?.map((CurrentPlace) => (
    <div className={styles.LocationCard} key={CurrentPlace.id} >
      <div className={styles.LocationCardTitleWrapper}>
        <div className={styles.LocationCardNameRatingWrapper}>
          <b className={styles.LocationCardName}>
            {CurrentPlace.title ? CurrentPlace.title : 'Нет названия'}
          </b>
          <p className={styles.LocationCardRating}>{`★ ${CurrentPlace.rank}`}</p>
        </div>
        <button className={styles.CardEditButton} >
          Ред.
          <i className="fi fi-sr-edit" />
        </button>
      </div>
      <b className={styles.LocationCardName}>{CurrentPlace.typeId ? CurrentPlace.typeId : 'No name'}</b>
      <b className={styles.LocationCardName}>{CurrentPlace.address}</b>
      <p className="LocationCardInfo">{CurrentPlace.description ? CurrentPlace.description : 'No description'}</p>
      {CurrentPlace.photoPath && (
        <div className={styles.LocationCardImageWrapper}>
          <img
            src={`../img/${CurrentPlace.photoPath}`}
            className={styles.LocationCardImage}
          />
        </div>
      )}
    </div>
  ))}
</div>

  </div>
    
  );
};