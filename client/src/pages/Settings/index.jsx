import { MinimizeMenuButton } from '@components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import { openLogout } from '@redux/slices/modalsSlice'

export const Settings = () => {
	const dispatch = useDispatch()
	// Основная информация
	const [nameInput, setNameInput] = useState('Анастасия')
	const [loginInput, setLoginInput] = useState('login_Anastasia')
	const [emailInput, setEmailInput] = useState('pomoechki@moi.com')
	const [selectedCity, setSelectedCity] = useState('Dim')
	// Безопасность
	const password = 'qwerty123'
	const [passwordInput, setPasswordInput] = useState('')
	const [newPassword1Input, setNewPassword1Input] = useState('')
	const [newPassword2Input, setNewPassword2Input] = useState('')
	// Фотография профиля
	const [selectedFile, setSelectedFile] = useState(null)

	const saveBasicInformationChanges = () => {
		const changes = {
			nameInput,
			loginInput,
			emailInput,
			selectedCity
		}
	}
	const savePasswordChanges = () => {
		if (password === passwordInput && newPassword1Input === newPassword2Input) {
			// Сохраняем изменнения
			alert('Cохраняем изменнения')
		} else {
			alert('ошибка')
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
					value={nameInput}
					onChange={(e) => setNameInput(e.target.value)}
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
					onChange={(e) => setSelectedCity(e.target.value)}
				>
					<option value="Dim">Димитровград</option>
					<option value="Msc">Москва</option>
					<option value="Ptrb">Санкт-Петербург</option>
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
					className={styles.MenuButton}
					onClick={() => alert('Выйти из аккаунта')}
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

			<Link to="/favourite">
				<div className={styles.MenuButton}>
					<i className="fi fi-sr-info" />
					<p>Справка</p>
				</div>
			</Link>

			<button
				onClick={() => dispatch(openLogout())}
				className={styles.MenuButton}
			>
				<i className="fi fi-sr-undo-alt" />
				<p>Выйти из аккаунта</p>
			</button>
		</div>
	)
}
