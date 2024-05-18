import {
	BackToMainMenu,
	MinimizeMenuButton,
	PlacesWrapper,
	TitleWrapper,
	UserCard
} from '@components'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export const AllPlaces = () => {
	const city = useSelector((state) => state.cities)
	const places = useSelector((state) => state.places)

	return (
		<div className={styles.MenuWrapper}>
			AllPlaces
			<div className={styles.Title}>
				<TitleWrapper/>
				<MinimizeMenuButton />
			</div>
			<BackToMainMenu />
			<PlacesWrapper
				places={places.filter((CurrentPlace) => CurrentPlace.PlaceId < 4)}
				WrapperText="Недавнее"
				WrapperButtonEnabled={false}
			/>
			<PlacesWrapper
				places={places.filter((CurrentPlace) => CurrentPlace.PlaceId < 9)}
				WrapperText="Рекомендуемое"
				WrapperButtonEnabled={false}
			/>
			<PlacesWrapper
				places={places}
				WrapperText={places.length + ' мест найдено'}
				WrapperButtonEnabled={false}
			/>
			<UserCard ShowLvl={false} ShowBalance={false} />
		</div>
	)
}
