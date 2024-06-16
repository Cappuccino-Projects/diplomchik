import {
	BackToMainMenu,
	AllPlacesWrapper,
	UserCard
} from '@components'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export const Favourite1 = () => {
	const places = useSelector((state) => state.places.places)
	//places.filter((place) => )

	return (
		<>
			<BackToMainMenu />

			<p className={styles.TitleText}>Избранное</p>

			<AllPlacesWrapper className={styles.CardsWrapper} places={places} WrapperText={'Места (' + places.length + ')'} WrapperButtonEnabled={false} />
			<UserCard ShowLvl={false} ShowBalance={false} IsItProfilePage={false} />
		</>
	)
}
