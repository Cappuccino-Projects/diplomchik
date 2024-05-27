import { useGetProductByIdQuery } from '@redux/services/productsApi'
import { useGetUserActivateItemsQuery } from '@redux/services/userApi'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

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
							src={`../img/${character?.iconPath}.png`}
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
