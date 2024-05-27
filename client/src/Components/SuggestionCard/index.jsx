// import { openEditReviewModal } from '@redux/slices/modalsSlice'
import {  useSelector } from 'react-redux'
import styles from './styles.module.css'

export const SuggestionCard = ({ item }) => {
    const { id,  placeType, comment, photoPath } = item

    // const dispatch = useDispatch()

    const removedPlaces = useSelector((state) => state.places.userSuggestions)
    const removedPlace = removedPlaces.find((place) => place.id === id)
		console.log('removedPlace', removedPlace)

    // const onChangeReviewClick = () => {
    //     dispatch(openEditReviewModal({ id }))
    // }

    return (
        <div className={styles.LocationCard}>
            <div className={styles.LocationCardTitleWrapper}>
                <div className={styles.LocationCardNameRatingWrapper}>
                    <b className={styles.LocationCardName}>
                        {removedPlace.title ? removedPlace.title : 'Нет названия'}
                    </b>
                </div>

            </div>
						<b className={styles.LocationCardName}>{placeType ? placeType : 'No name'}</b>
            <b className={styles.LocationCardName}>{removedPlace.address}</b>
            <p className="LocationCardInfo">{comment}</p>
            {photoPath && (
                <div className={styles.LocationCardImageWrapper}>
                    <img
                        src={`../img/${photoPath}`}
                        className={styles.LocationCardImage}
                    />
                </div>
            )}
        </div>
    )
}