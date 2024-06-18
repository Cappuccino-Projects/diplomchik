import {
	BackToMainMenu
} from '@components'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

import { FavoritePlacesList } from './FavoritePlacesList'

export const Favourite1 = () => {
	const user = useSelector((state) => state.user.user)
	return (
		<>
			<BackToMainMenu />
		
			<p className={styles.TitleText}>Избранное</p>
			<FavoritePlacesList userId={user.id} />
		</>
	)
}
