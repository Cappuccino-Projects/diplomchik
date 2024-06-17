import { useGetAllCityQuery } from '@app/redux/services/cityApi'
import { useAddUserMutation } from '@app/redux/services/userApi'
import { closeModal } from '@app/redux/slices/modalsSlice'
import { Button } from '@components/Button'
import { getIconPath } from '@shared/api/getIconPath'
import { uploadFile } from '@shared/api/uploadFile'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'

export const AddUser = () => {
	const { data: allCities = [], isFetching: isFetchingCities } = useGetAllCityQuery()
	const dispatch = useDispatch()
	const [createUser] = useAddUserMutation()

	const [displayName, setDisplayName] = useState('')
	const [login, setLogin] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [file, setFile] = useState()
	const [cities, setCities] = useState([])
	const [cityId, setCityId] = useState(0)
	const [iconPath, setIconPath] = useState()

	useEffect(() => {
		if (allCities.length === 0 && !isFetchingCities) {
			setCities(allCities)
		} else {
			setCities(allCities)
		}
	}, [isFetchingCities, allCities])

	useEffect(() => {
		if (file) {
			uploadFile(file).then(setIconPath)
		}
	}, [file])

	const onClose = () => dispatch(closeModal())

	const onSubmit = (e) => {
		e.preventDefault()
		createUser({
			login: login,
			displayName: displayName,
			email: email,
			cityId: cityId,
			password: password,
			avatar: file
		})
		onClose()
	}

	return (
		<form className={styles.AddUser} onSubmit={onSubmit}>
			<div className={styles.AddUser__title}>Добавление пользователя</div>
			<div className={styles.AddUser__fields}>
				<label className={styles.AddUser__input}>
					<div>Имя</div>
					<input
						type="text"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
					/>
				</label>
				<label className={styles.AddUser__input}>
					<div>Логин</div>
					<input
						type="text"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
				</label>
				<label className={styles.AddUser__input}>
					<div>Почта</div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label className={styles.AddUser__input}>
					<div>Пароль</div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				
				<label className={styles.AddUser__select}>
					<div>Город</div>
					<select value={cityId} onChange={(e) => setCityId(e.target.value)}>
						<option value="">Выберите город</option>
						{cities.map((city) => (
							<option key={city.id} value={city.id}>{city.name}</option>
						))}
					</select>
				</label>
				<label className={styles.AddUser__input}>
					<div>Аватар: {file?.name || 'не загружено'}</div>
					<div className={styles.AddUser__fileInput}>
						<div className={styles.AddUser__preview}>
							{iconPath && <img src={getIconPath(iconPath)}  />}
						</div>
						<label>
							<input type="file" onChange={(e) => setFile(e.target.files[0])} />
							Загрузить изображение
						</label>
					</div>
				</label>
			</div>
			<div className={styles.AddUser__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.AddUser__button}
					type="button"
				>
					Отмена
				</Button>
				<Button
					variant="primary"
					withBorder
					className={styles.AddUser__button}
					type="submit"
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}
