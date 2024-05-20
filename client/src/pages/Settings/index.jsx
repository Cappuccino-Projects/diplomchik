import { MinimizeMenuButton } from '@components'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import { openLogout } from '@redux/slices/modalsSlice'
import { useSelector } from 'react-redux'
import { useGetAllCityQuery } from '@app/redux/services/cityApi'
import { useUpdateUserInfoByIdMutation } from '@app/redux/services/userApi'
import { openBadPassword } from '@redux/slices/modalsSlice'
export const Settings = () => {
	// Получение пользователя
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.user)

	// Получение городов
	const { data: cityData = [], isFetching: isFetchingCity } =
		useGetAllCityQuery()
	const [cityList, setcityList] = useState([])

	// Изменение данных пользователя
	const [updateUserInfo] = useUpdateUserInfoByIdMutation()

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
		alert('Вы успешно обновили основные данные')
	}

	const savePasswordChanges = async () => {
		if (
			password === passwordInput &&
			newPassword1Input === newPassword2Input &&
			newPassword1Input.length >= 6
		) {
			const newUser = {
				...user,
				passwordHash: password
			}
			await updateUserInfo(newUser)
		} else {
			dispatch(openBadPassword())
		}
	}

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.MenuTopButtonsWrapper}>
				<Link style={{ width: 'fit-content' }} to="/profile">
					<div className="SecondarySmallButton">
						<i className="fi-sr-angle-left" />
						<p>Обратно в профиль</p>
					</div>
				</Link>
				<MinimizeMenuButton />
			</div>
			<p className={styles.TitleText}>Настройки</p>
			<p>Основная информация</p>
			<div className="Card">
				<p>Имя</p>

				<input
					type="text"
					className={styles.MenuTextArea}
					value={displayNameInput}
					onChange={(e) => setDisplayNameInput(e.target.value)}
				/>
				<p>Логин</p>
				<input
					type="text"
					className={styles.MenuTextArea}
					value={loginInput}
					onChange={(e) => setLoginInput(e.target.value)}
				/>
				<p>Электронная почта</p>
				<input
					type="email"
					className={styles.MenuTextArea}
					value={emailInput}
					onChange={(e) => setEmailInput(e.target.value)}
				/>
				<p>Город</p>
				<select
					className={styles.MenuDropDown}
					value={selectedCity}
					onChange={(e) => console.log(e.target.value)}
				>
					{cityList.map((choice) => (
						<option key={choice.id} value={choice.id}>
							{choice.name}
						</option>
					))}
				</select>
				<button
					className={styles.MenuButton}
					onClick={saveBasicInformationChanges}
				>
					<i className="fi-sr-comment-check" />
					<p>Сохранить изменения</p>
				</button>
			</div>
			<p>Фотография профиля</p>
			<div className="Card">
				<img className="UserCardImage" src="../img/User1Avatar.png" />
				{/* {selectedFile ? selectedFile.name : ""} */}
				<label>
					<span className={styles.MenuButton}>Изменить изображение</span>
					<input
						style={{ display: 'none' }}
						type="file"
						accept=".png,.jpg"
						onChange={(e) => setSelectedFile(e.target.files[0])}
					/>
				</label>
			</div>
			<p>Безопасность</p>
			<div className="Card">
				<p>Текущий пароль</p>
				<input
					type="password"
					className={styles.MenuTextArea}
					value={passwordInput}
					onChange={(e) => setPasswordInput(e.target.value)}
				/>
				<p>Новый пароль</p>
				<input
					type="password"
					className={styles.MenuTextArea}
					value={newPassword1Input}
					onChange={(e) => setNewPassword1Input(e.target.value)}
				/>
				<p>Повторите пароль</p>
				<input
					type="password"
					className={styles.MenuTextArea}
					value={newPassword2Input}
					onChange={(e) => setNewPassword2Input(e.target.value)}
				/>
				<button className={styles.MenuButton} onClick={savePasswordChanges}>
					<i className="fi fi-sr-lock" />
					<p>Сменить пароль</p>
				</button>
			</div>
			<p>Дополнительно</p>
			<div className="Card">
				<button className={styles.MenuButton} onClick={() => alert('Справка')}>
					<i className="fi fi-sr-info" />
					<p>Справка</p>
				</button>
				<button
					onClick={() => dispatch(openLogout())}
					className={styles.MenuButton}
				>
					<i className="fi fi-sr-undo-alt" />
					<p>Выйти из аккаунта</p>
				</button>
			</div>

			{/* Дальше идут мечты можно не смотреть*/}
			{/* <div className="Card">
				<p>Двухэтапная аутентификация</p>
				<div className={styles.MainMenuButton}>
					<i className="fi-sr-data-transfer" />
					<p>Подключить</p>
				</div>
			</div>
			<div className={styles.MainMenuButtonsWrapper}>
				<div>
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-letter-case" />
						<p>Язык: Русский</p>
					</div>
	</Link>*/}
		</div>
	)
}
