import { useGetAllCityQuery } from '@app/redux/services/cityApi'
import { useUploadImageMutation } from '@app/redux/services/uploadApi'
import { useUpdateUserInfoByIdMutation } from '@app/redux/services/userApi'
import { openBadPassword, openLogout } from '@redux/slices/modalsSlice'
import { getIconPath } from '@shared/api/getIconPath'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const Settings = () => {
	const dispatch = useDispatch()

	const [updateUserInfo] = useUpdateUserInfoByIdMutation()
	const [uploadImage] = useUploadImageMutation()

	const user = useSelector((state) => state.user.user)

	const { data: cityData = [], isFetching: isFetchingCity } = useGetAllCityQuery()
	const [cityList, setcityList] = useState([])

	useEffect(() => {
		if (!isFetchingCity) {
			setcityList(cityData)
		}
	}, [cityData])

	// Основная информация
	const [displayNameInput, setDisplayNameInput] = useState('')
	const [loginInput, setLoginInput] = useState('')
	const [emailInput, setEmailInput] = useState('')
	const [selectedCity, setSelectedCity] = useState('')
	const [password, setPassword] = useState('')
	// // Безопасность
	const [passwordInput, setPasswordInput] = useState('')
	const [newPassword1Input, setNewPassword1Input] = useState('')
	const [newPassword2Input, setNewPassword2Input] = useState('')
	// Фотография профиля
	const [selectedFile, setSelectedFile] = useState(null)

	useEffect(() => {
		setDisplayNameInput(user.displayName)
		setLoginInput(user.login)
		setEmailInput(user.email)
		setSelectedCity(user.cityId)
		setPassword(user.passwordHash)
	}, [user])

	const saveBasicInformationChanges = async () => {
		const newUser = {
			...user,
			displayName: displayNameInput,
			login: loginInput,
			email: emailInput,
			cityId: selectedCity
		}
		await updateUserInfo(newUser)
	}

	const savePasswordChanges = async () => {
		if (password === passwordInput && newPassword1Input === newPassword2Input && newPassword1Input.length >= 6) {
			const newUser = {
				...user,
				passwordHash: password
			}
			await updateUserInfo(newUser)
		} else {
			dispatch(openBadPassword())
		}
	}
	const saveUserAvatarChanges = async () => {
		const file = selectedFile

		const formData = new FormData()
		//const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		const now = new Date()
		const newFileName = `avatar-${user.id}-${now.toISOString().replace(/\D/g, '').slice(0, -3)}`

		formData.append('file', file)
		await uploadImage({ image: formData, name: newFileName })

		const newUser = {
			...user,
			avatarPath: newFileName
		}
		await updateUserInfo(newUser)

		setSelectedFile(null)
	}

	return (
		<>
			<div className={styles.MenuTopButtonsWrapper}>
				<Link style={{ width: 'fit-content' }} to="/profile">
					<div className={styles.SecondarySmallButton}>
						<i className="fi-sr-angle-left" />
						<p>Обратно в профиль</p>
					</div>
				</Link>
			</div>
			<p className={styles.TitleText}>Настройки</p>
			<p>Основная информация</p>
			<div className={styles.Card}>
				<p>Имя</p>
				<input type="text" className={styles.MenuTextArea} value={displayNameInput} onChange={(e) => setDisplayNameInput(e.target.value)} />
				<p>Логин</p>
				<input type="text" className={styles.MenuTextArea} value={loginInput} onChange={(e) => setLoginInput(e.target.value)} />
				<p>Электронная почта</p>
				<input type="email" className={styles.MenuTextArea} value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
				<p>Город</p>
				<select className={styles.MenuDropDown} value={selectedCity} onChange={(e) => console.log(e.target.value)}>
					{cityList.map((choice) => (
						<option key={choice.id} value={choice.id}>
							{choice.name}
						</option>
					))}
				</select>
				<button className={styles.MenuButton} onClick={saveBasicInformationChanges}>
					<i className="fi-sr-comment-check" />
					<p>Сохранить изменения</p>
				</button>
			</div>
			<p>Фотография профиля</p>
			<div className={styles.Card}>
				<img
					className={styles.UserCardImage}
					src={selectedFile ? URL.createObjectURL(selectedFile) : user.avatarPath ? getIconPath(user.avatarPath) : getIconPath('default-avatar')}
					style={{ margin: 'auto' }}
				/>
				<label>
					<span className={styles.MenuButton} style={{ alignContent: 'center' }}>
						Изменить изображение
					</span>
					<input style={{ display: 'none' }} type="file" accept=".png,.jpg" onChange={(e) => setSelectedFile(e.target.files[0])} />
				</label>
				{selectedFile && (
					<button className={styles.MenuButton} onClick={() => saveUserAvatarChanges()}>
						Сохранить {selectedFile.name}
					</button>
				)}
			</div>
			<p>Безопасность</p>
			<div className={styles.Card}>
				<p>Текущий пароль</p>
				<input type="password" className={styles.MenuTextArea} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
				<p>Новый пароль</p>
				<input type="password" className={styles.MenuTextArea} value={newPassword1Input} onChange={(e) => setNewPassword1Input(e.target.value)} />
				<p>Повторите пароль</p>
				<input type="password" className={styles.MenuTextArea} value={newPassword2Input} onChange={(e) => setNewPassword2Input(e.target.value)} />
				<button className={styles.MenuButton} onClick={savePasswordChanges}>
					<i className="fi fi-sr-lock" />
					<p>Сменить пароль</p>
				</button>
			</div>
			<p>Дополнительно</p>
			<div className={styles.Card}>
				<Link to="/info" className={styles.MenuButton}>
					<i className="fi fi-sr-info" />
					<p>Справка</p>
				</Link>

				<button onClick={() => dispatch(openLogout())} className={styles.MenuButton}>
					<i className="fi fi-sr-undo-alt" />
					<p>Выйти из аккаунта</p>
				</button>

				{/* <button
					onClick={() => {
						// Функция getCurrentDateWithoutTime возвращает текущую дату без времени.
						function getCurrentDateWithoutTime() {
							const today = new Date() // Получаем текущую дату и время
							return new Date(today.getFullYear(), today.getMonth(), today.getDate()) // Создаем новый объект даты без времени, используя только год, месяц и день
						}

						// Функция stripTimeFromDate обнуляет время в переданной дате.
						function stripTimeFromDate(date) {
							return new Date(date.getFullYear(), date.getMonth(), date.getDate()) // Создаем новый объект даты без времени, используя только год, месяц и день из переданной даты
						}

						// Функция checkIfDateIsPastOrYesterday проверяет, является ли переданная дата прошедшей или сегодняшним днем.
						function checkIfDateIsPastOrYesterday(date) {
							const todayWithoutTime = getCurrentDateWithoutTime() // Получаем текущую дату без времени
							const inputDateWithoutTime = stripTimeFromDate(date) // Получаем переданную дату без времени
							console.log("Переданная ", inputDateWithoutTime)
							return inputDateWithoutTime < todayWithoutTime // Сравниваем переданную дату с текущей датой без времени и возвращаем результат сравнения
						}

						const currentDateWithoutTime = getCurrentDateWithoutTime() // Получаем текущую дату без времени
						console.log("Текущая дата ",currentDateWithoutTime)
						const isDatePastOrYesterday = checkIfDateIsPastOrYesterday(currentDateWithoutTime) // Проверяем, является ли текущая дата прошедшей или сегодняшним днем
						console.log(isDatePastOrYesterday) // Выводим результат в консоль
					}}
					className={styles.MenuButton}
				>
					<p>Кнопка</p>
				</button> */}
			</div>
		</>
	)
}
