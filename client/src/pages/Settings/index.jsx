import { MinimizeMenuButton } from '@components'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const Settings = () => {
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
				<p>Электронная почта</p>
				<textarea className={styles.MenuTextArea}>pomoechki@moi.com</textarea>
				<p>Город</p>
				<select className={styles.MenuDropDown} name="City" id="City">
					<option value="Dim">Димитровград</option>
					<option value="Msc">Москва</option>
					<option value="Ptrb">Санкт-Петербург</option>
					<option value="Saray">Сарай</option>
				</select>
			</div>

			<p>Фотография профиля</p>
			<div className="UploadImageWrapper">
				<img className="UserCardImage" src="../img/User1Avatar.png" />
				<p>Загрузить фото</p>
			</div>

			<p>Безопасность</p>
			<div className="Card">
				<p>Пароль</p>
				{/* TODO: заменить на input */}
				<textarea className={styles.MenuTextArea}>•••••••••••••••••••</textarea>
				<Link to="/">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-lock" />
						<p>Сменить пароль</p>
					</div>
				</Link>
			</div>
			<div className="Card">
				<p>Двухэтапная аутентификация</p>
				<Link to="/">
					<div className={styles.MainMenuButton}>
						<i className="fi-sr-data-transfer" />
						<p>Подключить</p>
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

				<Link to="/favourite">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-diamond" />
						<p>Оценить приложение</p>
					</div>
				</Link>

				<Link to="/mapeditmenu">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-undo-alt" />
						<p>Выйти из аккаунта</p>
					</div>
				</Link>
			</div>
			<br></br>
		</div>
	)
}
