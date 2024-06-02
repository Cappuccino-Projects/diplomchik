import { Button } from '@components/Button'
import AdminPanelWrapper from '../wrapper'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'

export const Users = () => {
	const dispatch = useDispatch()

	// const openAddPopup = () => {
	// 	dispatch(openAddProduct())
	// }

	return (
		<AdminPanelWrapper>
			<div className={styles.products}>
				<h1 className={styles.products__title}>Пользователи</h1>
				<Button
					variant="primary"
					icon="fi-sr-plus-small"
					className={styles.products__button}
					type="button"
					onClick={openAddPopup}
				>
					Новый пользователь
				</Button>
			</div>
		</AdminPanelWrapper>
	)
}
