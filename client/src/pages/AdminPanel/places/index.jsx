import { useDispatch } from 'react-redux'
import AdminPanelWrapper from '../wrapper'
import { PlacesList } from './placesList'
import styles from './styles.module.css'

export const Places = () => {
	const dispatch = useDispatch()

	return (
		<AdminPanelWrapper>
			<div className={styles.places}>
				<h1 className={styles.places__title}>Заявки</h1>
				<PlacesList />
			</div>
		</AdminPanelWrapper>
	)
}
