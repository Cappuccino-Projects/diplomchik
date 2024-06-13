import {
	BackToMainMenu,
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

			<AllPlacesWrapper className={styles.CardsWrapper} places={places} WrapperText={'Места (' + places.length + ')'} WrapperButtonEnabled={false} />

			<UserCard ShowLvl={false} ShowBalance={false} />
		</>
	)
}
