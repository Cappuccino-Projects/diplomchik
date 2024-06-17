import { useGetAllUsersQuery } from '@redux/services/userApi'
import { useEffect, useState } from 'react'
import { UserCard } from '../userCard'
import styles from './styles.module.css'

export const UsersList = () => {

	const [users, setUsers] = useState([])
	const { data: AllUsers = [], isFetching: isFetchingAllUsers, error, isLoading } = useGetAllUsersQuery()

	useEffect(() => {
		if (!isFetchingAllUsers) {
			setUsers(AllUsers)
		} else {
			setUsers([])
		}
	}, [AllUsers, isFetchingAllUsers])

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