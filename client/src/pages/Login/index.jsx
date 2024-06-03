import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useAuthenticateMutation } from '@redux/services/authApi'
import { setUser } from '@redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'


const InputField = ({ label, value, type = "text", onChange }) => (
	<div>
		<p>{label}</p>
		<input type={type} value={value} onChange={onChange} className={styles.MenuTextArea} />
	</div>
);


export const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [authenticate, { isLoading }] = useAuthenticateMutation()

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');



	const handleLogin = async (login, password) => {
		try {
			const result = await authenticate({ login, password }).unwrap()
			dispatch(setUser(result))
			navigate('/mainmenu')
		} catch (error) {
			console.error('Failed to login:', error)
		}
	}




	return (

		<div className={styles.AuthorizationPageContent}>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className={styles.AuthorizationPageContent}>
					<div className={styles.AuthorizationDesignCard}>
						<h1>Авторизация во ВсеМеста</h1>
						<p className={styles.WelcomeText}>ВсеМеста - это сервис, который поможет вам наслаждаться окружающей природой с заботой о её сохранности и приятными прогулками.</p>
						<i className={styles.WelcomeIcon + " fi fi-sr-sun"} />
						<p className={styles.WelcomeBottomText}>Давайте вместе сделаем город чистым и комфортным!</p>
					</div>
					<div className={styles.AuthorizationInfoWrapper}>
						<div className={styles.AuthorizationTextareasWrapper}>
							<InputField label="Электронная почта" value={email} onChange={e => setEmail(e.target.value)} />
							<InputField label="Пароль" value={password} type="password" onChange={e => setPassword(e.target.value)} />
						</div>
						<div className={styles.AuthorizationButtonWrapper}>
							<div className={styles.AuthorizationButton} onClick={() => handleLogin(email, password)}>Войти</div>
						</div>

						<Link className={styles.LinkText} to="/registration">
							<p>
								Еще нет аккаунта? <u>Создать</u>
							</p>
						</Link>
					</div>

				</div>
			)}
		</div>

	)

}