import { MinimizeMenuButton } from '@components'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import { openLogout } from '@redux/slices/modalsSlice'

export const Settings = () => {
	const dispatch = useDispatch()

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
				<textarea className={styles.MenuTextArea}>Щуковская Анастасия</textarea>
				<p>Логин</p>
				<textarea className={styles.MenuTextArea}>@pomoechkimoi</textarea>
				<p>Электронная почта</p>
				<textarea className={styles.MenuTextArea}>pomoechki@moi.com</textarea>
				<p>Город</p>
				<select className={styles.MenuDropDown} name="City" id="City">
					<option value="Dim">Димитровград</option>
					<option value="Msc">Москва</option>
					<option value="Ptrb">Санкт-Петербург</option>
					<option value="Saray">Сарай</option>
				</select>
				<div className={styles.MainMenuButton}>
					<i className="fi fi-sr-comment-check" />
					<p>Сохранить изменения</p>
				</div>
			</div>

			<p>Фотография профиля</p>
			<div className="UploadImageWrapper">
				<img className="UserCardImage" src="../img/User1Avatar.png" />
				<p>Загрузить фото</p>
			</div>

			<p>Безопасность</p>
			<div className="Card">
				<p>Текущий пароль</p>
				{/* TODO: заменить на input */}
				<textarea className={styles.MenuTextArea}>•••••••••••••••••••</textarea>
				<p>Новый пароль</p>
				{/* TODO: заменить на input */}
				<textarea className={styles.MenuTextArea}>•••••••••••••••••••</textarea>
				<Link to="/">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-lock" />
						<p>Сменить пароль</p>
					</div>
				</Link>
			</div>

			<div className={styles.MainMenuButtonsWrapper}>
				<Link to="/favourite">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-letter-case" />
						<p>Язык: Русский</p>
					</div>
				</Link>

				<Link to="/favourite">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-info" />
						<p>Справка</p>
					</div>
				</Link>

				<button onClick={() => dispatch(openLogout())} className={styles.MenuButton}>
					<i className="fi fi-sr-undo-alt" />
					<p>Выйти из аккаунта</p>
				</button>
			</div>
			<br></br>
		</div>
	)
}
