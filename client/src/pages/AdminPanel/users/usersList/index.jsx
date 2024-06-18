import { useSelector } from 'react-redux'
import { UserCard } from '../userCard'
import styles from './styles.module.css'

export const UsersList = ({ isLoading, error }) => {
	const users = useSelector((state) => state.user.usersList)
	
	if (isLoading) {
		return <h1 className={styles.usersList__message}>Загрузка...</h1>
	}

	if (error) {
		return <h1 className={styles.usersList__message}>Произошла ошибка!</h1>
	}


	return (
		<ul className={styles.usersList}>
			{users.map((user) => (
				<li key={user.id}>
				<UserCard user={user} />
			</li>
			))}
		</ul>
	)
}