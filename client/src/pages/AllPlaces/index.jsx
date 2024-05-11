import styles from './styles.module.css'
import {
	LogoWrapper,
	MinimizeMenuButton,
	BackToMainMenu,
	PlacesWrapper
} from '@components'

export const AllPlaces = (props) => {
	const { places, city } = props

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.Title}>
				<LogoWrapper city={city} />
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
			<UserCard ShowLvl={false} ShowBalance={false} IsItProfilePage={false} />
		</div>
	)
}
