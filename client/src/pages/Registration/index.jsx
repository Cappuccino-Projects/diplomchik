import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const Registration = () => {
	return (
		<div className={styles.AuthorizationPageContent}>
			<div className={styles.AuthorizationDesignCard}>
				<h1>Регистрация во Всеместа</h1>
				<p>
					Всеместа - это сервис, чтобы вы да леоаои и не тток вв назад карта
					карта
				</p>
				<i className="fi fi-sr-sun" />
				<p style={{ marginLeft: 'auto' }}>
					Давайте сделаем классный город вместе ура ура
				</p>
			</div>
			<div className={styles.AuthorizationInfoWrapper}>
				<div className={styles.AuthorizationTextareasWrapper}>
					{/* TODO вынести в компонент + <input/> */}
					<p>Имя</p>
					<textarea className="MenuTextArea">Щуковская Анастасия</textarea>
					{/* TODO вынести в компонент + <input/> */}
					<p>Логин</p>
					<textarea className="MenuTextArea">Щуковская Анастасия</textarea>
					{/* TODO вынести в компонент + <input/> */}
					<p>Электронная почта</p>
					<textarea className="MenuTextArea">Щуковская Анастасия</textarea>
					{/* TODO вынести в компонент + <input/> */}
					<p>Пароль</p>
					<textarea className="MenuTextArea">Щуковская Анастасия</textarea>
					{/* TODO вынести в компонент + <input/> */}
					<p>Повтор пароля</p>
					<textarea className="MenuTextArea">Щуковская Анастасия</textarea>
					{/* TODO вынести в компонент + <input/> */}
					<p>Город</p>
					<select className={styles.MenuDropDown} name="City" id="City">
						<option value="Dim">Димитровград</option>
						<option value="Msc">Москва</option>
						<option value="Ptrb">Санкт-Петербург</option>
						<option value="Saray">Сарай</option>
					</select>
				</div>

				<div className={styles.AuthorizationButtonWrapper}>
					<div className={styles.AuthorizationButton}>Создать аккаунт</div>
					<Link to="/login">
						<p>
							Уже есть аккаунт? <u>Войти</u>
						</p>
					</Link>
				</div>
			</div>
		</div>
	)
}
