import { Button } from '@components/Button'
import { openAddUser } from '@redux/slices/modalsSlice'
import { useDispatch } from 'react-redux'
import AdminPanelWrapper from '../wrapper'
import styles from './styles.module.css'
import { UsersList } from './usersList'

export const Users = () => {
	const dispatch = useDispatch()
	const openAdd = () => dispatch(openAddUser())
	
	return (
		<AdminPanelWrapper>
			<div className={styles.users}>
				<h1 className={styles.users__title}>Список пользователей</h1>
				<Button
					variant="primary"
					icon="fi-sr-plus-small"
					className={styles.users__button}
					type="button"
					onClick={openAdd}
				>
					Новый пользователь
				</Button>
				<UsersList />
			</div>
		</AdminPanelWrapper>
	)
}
