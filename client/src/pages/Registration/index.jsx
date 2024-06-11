import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useRegisterMutation } from '@redux/services/registrationApi'
import { useAuthenticateMutation } from '@app/redux/services/authApi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '@redux/slices/userSlice'


export const Registration = () => {
	const [login, setLogin] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [email, setEmail] = useState('')
	const [cityId, setCityId] = useState(1)
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [register, {  isLoading }] = useRegisterMutation();
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [authenticate] = useAuthenticateMutation();

	const [regError, setRegError] = useState(false);
	const [regErrorText, setRegErrorText] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setRegError(true);
			setRegErrorText('Пароли не совпадают!');
		} else {
			try {
				const registerResponse = await register({ login, displayName, email, cityId, password, confirmPassword });
				if (registerResponse.data) {
					// handle successful registration
					console.log('Registration successful', registerResponse.data);
					// authenticate the user
					const authResult = await authenticate({ login: registerResponse.data.login, password });
					if (authResult.data) {
						console.log('Authentication successful', authResult.data);
						dispatch(setUser(authResult))
						navigate('/mainmenu')
					} else if (authResult.error) {
						console.error('Authentication failed', authResult.error.message);
					}
				} else if (registerResponse.error) {
					// handle error during registration
					console.error('Registration failed', registerResponse.error.message);
					setRegError(true);
					setRegErrorText(registerResponse.error.message);
				}
			} catch (error) {
				// handle error during registration
				console.error('Registration failed', error);
			}
		}
	};

	// if (isSuccess) {
	// 	return <div>Registration successful!</div>
	// }

	return (
		<div className={styles.AuthorizationPageContent}>
			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<div className={styles.AuthorizationPageContent}>
					<div className={styles.AuthorizationDesignCard}>
						<h1>Регистрация во ВсеМеста</h1>
						<p className={styles.WelcomeText}>ВсеМеста - это сервис, который поможет вам наслаждаться окружающей природой с заботой о её сохранности и приятными прогулками.</p>
						<i className={styles.WelcomeIcon + " fi fi-sr-sun"} />
						<p className={styles.WelcomeBottomText}>Давайте вместе сделаем город чистым и комфортным!</p>
					</div>

					<div className={styles.AuthorizationInfoWrapper}>
						<div className={regError ? styles.ErrorText : styles.HideElement}>
							<p>{regErrorText ?? 'Ошибка при регистрации!'}</p>
						</div>
						<div className={styles.AuthorizationTextareasWrapper}>
							<form onSubmit={handleSubmit} className={styles.AuthorizationTextareasWrapper}>
								<p>Имя</p>
								<input className={styles.MenuTextArea} type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
								<p>Логин</p>
								<input className={styles.MenuTextArea}  type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
								<p>Электронная почта</p>
								<input className={styles.MenuTextArea}  type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
								<p>Пароль</p>
								<input className={styles.MenuTextArea}  type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
								<p>Повтор пароля</p>
								<input className={styles.MenuTextArea}  type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
								<p>Город</p>
								<select className={styles.MenuDropDown} value={cityId} onChange={(e) => setCityId(Number(e.target.value))}>
									<option value={1}>Димитровград</option>
								</select>

								<button className={`${styles.AuthorizationButtonWrapper} ${styles.AuthorizationButton}`} type="submit">
									Создать аккаунт
								</button>
							</form>
						</div>
						<Link className={styles.LinkText} to="/login">
							<p>
								Уже есть аккаунт? <u>Войти</u>
							</p>
						</Link>
					</div>
				</div>
			)}
		</div>
	)
}
