import { useGetProductByIdQuery } from '@redux/services/productsApi'
import { useGetUserActivateItemsQuery } from '@redux/services/userApi'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import { getIconPath } from '@shared/api/getIconPath'

export const CharacterCard = () => {
	const userId = useSelector((state) => state.user.user.id)
	const { data: activateProducts = {} } = useGetUserActivateItemsQuery(userId)
	const { data: character = {} } = useGetProductByIdQuery(
		activateProducts.character
	)

	return (
		<>
			{activateProducts.character ? (
				<div className={styles.Card}>
					<div className={styles.CharacterPictureWrapper}>
						<img
							src={getIconPath(character?.iconPath)}
							className={styles.CharacterPicture}
						></img>
					</div>
					<p className={styles.CharacterText}>{character?.name}</p>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
