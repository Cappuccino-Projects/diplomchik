import { useGetAllCityQuery } from '@app/redux/services/cityApi'
import { useUpdateUserByIdMutation } from '@app/redux/services/userApi'
import { Button } from '@components/Button'
import { closeModal } from '@redux/slices/modalsSlice'
import { getIconPath } from '@shared/api/getIconPath'
import { uploadFile } from '@shared/api/uploadFile'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'

export const EditUser = () => {
	const user = useSelector((state) => state.modals.data.editUser)
	const [editUser] = useUpdateUserByIdMutation()
	
	const dispatch = useDispatch()

	const [displayName, setDisplayName] = useState(user.displayName)
	const [login, setLogin] = useState(user.login)
	const [email, setEmail] = useState(user.email)
	const [password, setPassword] = useState(user.passwordHash)
	const [file, setFile] = useState(user.file)
	const [cities, setCities] = useState([])
	const [cityId, setCityId] = useState(user.cityId)
	const [iconPath, setIconPath] = useState()

	const { data: AllCities = [], isFetching: isFetchingCities } = useGetAllCityQuery()

	useEffect(() => {
		if (AllCities.length === 0 && !isFetchingCities) {
			setCities(AllCities)
		} else {
			setCities(AllCities)
		}
	}, [isFetchingCities, AllCities])

	useEffect(() => {
		if (file) {
			uploadFile(file).then(setIconPath)
		} else {
			setIconPath(user.avatarPath)
		}
	}, [file, user.avatarPath])

	const onClose = () => dispatch(closeModal())
	const onSubmit = (e) => {
		e.preventDefault()

		editUser({
			id: user.id,
			user: {
				login: login,
				displayName: displayName,
				email: email,
				passwordHash: password,
				cityId: cityId,
				avatarPath: iconPath,
			}
		})
		dispatch(closeModal())
	}

	return (
		<form className={styles.EditUser} onSubmit={onSubmit}>
			<div className={styles.EditUser__title}>Редактирование пользователя</div>
			<div className={styles.EditUser__fields}>
				<label className={styles.EditUser__input}>
					<div>Имя</div>
					<input
						type="text"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
					/>
				</label>
				<label className={styles.EditUser__input}>
					<div>Логин</div>
					<input
						type="text"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
				</label>
				<label className={styles.EditUser__input}>
					<div>Почта</div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label className={styles.EditUser__input}>
					<div>Пароль</div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				
				<label className={styles.EditUser__select}>
					<div>Город</div>
					<select value={cityId} onChange={(e) => setCityId(e.target.value)}>
						{cities.map((city) => (
							<option key={city.id} value={city.id}>
								{city.name}
							</option>
						))}
					</select>
				</label>
				<label className={styles.EditUser__input}>
					<div>Аватар: {file?.name || `${user?.avatarPath}.jpg`}</div>
					<div className={styles.EditUser__fileInput}>
						<div className={styles.EditUser__preview}>
							{iconPath && <img src={getIconPath(iconPath)}  />}
						</div>
						<label>
							<input type="file" onChange={(e) => setFile(e.target.files[0])} />
							Загрузить изображение
						</label>
					</div>
				</label>
			</div>
			<div className={styles.EditUser__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.EditUser__button}
					type="button"
				>
					Отмена
				</Button>
				<Button
					variant="primary"
					withBorder
					className={styles.EditUser__button}
					type="submit"
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}