import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const Login = () => {
	return (
		<div className={styles.AuthorizationPageContent}>
			<div className={styles.AuthorizationDesignCard}>
				<h1>Авторизация во Всеместа</h1>
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
					<p>Электронная почта</p>
					<textarea className="MenuTextArea">Щуковская Анастасия</textarea>
					{/* TODO вынести в компонент + <input/> */}
					<p>Пароль</p>
					<textarea className="MenuTextArea">Щуковская Анастасия</textarea>
				</div>
				<div className={styles.AuthorizationButtonWrapper}>
					<div className={styles.AuthorizationButton}>Войти</div>
					<Link to="/registration">
						<p>
							Еще нет аккаунта? <u>Создать</u>
						</p>
					</Link>
				</div>
			</div>
		</div>
	)
}
