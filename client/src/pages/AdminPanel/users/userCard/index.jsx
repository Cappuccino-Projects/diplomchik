import { useGetCityByIdQuery } from '@app/redux/services/cityApi'
import { Button } from '@components/Button'
import { openDeleteUser, openEditUser } from '@redux/slices/modalsSlice'
import { getIconPath } from '@shared/api/getIconPath'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'

export const UserCard = ({ user }) => {
	const { login, displayName, cityId, email, avatarPath, id } = user
	const dispatch = useDispatch()
	const openDelete = () => dispatch(openDeleteUser(user))
	const openEdit = () => dispatch(openEditUser(user))
	const [city, setCity] = useState('')
	const { data: cityQuery = '', isFetching: isFetching } = useGetCityByIdQuery(cityId)

	useEffect(() => {
		if (!isFetching) {
			setCity(cityQuery.name)
		} else {
			setCity('')
		}
	}, [cityQuery, isFetching])

	return (
		<div className={styles.userCard}>
			<div className={styles.userCard__header}>
				<div className={styles.userCard__info}>
					<div className={styles.userCard__avatar}>
						<img src={getIconPath(avatarPath ?? 'default-avatar')} alt="avatar" className={styles.userCard__image} />
					</div>
					<div className={styles.userCard__name}>
						<div className={styles.userCard__displayName}>{displayName}</div>
						<div className={styles.userCard_login}>@{login}</div>
					</div>
				</div>
				<div className={styles.userCard__buttons}>
					<Button variant="icon" icon="fi-sr-trash" type="button" onClick={openDelete} />
					<Button variant="icon" icon="fi-sr-edit" type="button" onClick={openEdit} />
				</div>
			</div>
			<div className={styles.userCard__email}>
				{email}				
			</div>
			<div className={styles.userCard__city}>
        г. {city}
			</div>
		</div>
	)
}
