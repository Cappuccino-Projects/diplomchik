import AdminPanelWrapper from '../wrapper'
import { ReviewsList } from './reviewsList'
import styles from './styles.module.css'

export const Reviews = () => {
	return (
		<AdminPanelWrapper>
			<div className={styles.reviews}>
				<h1 className={styles.reviews__title}>Отзывы</h1>
				<ReviewsList />
			</div>
		</AdminPanelWrapper>
	)
}