import {
	BackToMainMenu,
	PlacesWrapper,
	TitleWrapper,
	UserCard,
	AllPlacesWrapper
} from '@components'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export const AllPlaces = () => {
	//const city = useSelector((state) => state.cities)
	const places = useSelector((state) => state.places.places)

	console.log('allPlacesPage:', places)

	return (
		<>
			<TitleWrapper />

			
			<BackToMainMenu />

			<AllPlacesWrapper className={styles.CardsWrapper} places={places} WrapperText={places.length + ' мест найдено!!!'} WrapperButtonEnabled={false} />

			<PlacesWrapper
				places={Array.isArray(places) ? places.filter((CurrentPlace) => CurrentPlace && CurrentPlace.PlaceId < 4) : []}
				WrapperText="Недавнее"
				WrapperButtonEnabled={false}
			/>
			<PlacesWrapper places={Array.isArray(places) ? places.filter((CurrentPlace) => CurrentPlace.PlaceId < 9) : []} WrapperText="Рекомендуемое" WrapperButtonEnabled={false} />

			<UserCard ShowLvl={false} ShowBalance={false} />
		</>
	)
}
