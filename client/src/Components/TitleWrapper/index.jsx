import { geolocation } from '@shared/api'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export const TitleWrapper = () => {
	const [city, setCity] = useState('Определяем город...')

	const getCity = () => {
		navigator.geolocation.getCurrentPosition(
			async (data) => {
				const y = await geolocation(data.coords.latitude, data.coords.longitude)
				setCity(y.data.features[0].properties.city)
			},
			(error) => {
				console.error(error)
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
		)
	}

	useEffect(() => {
		getCity()
	}, [])

	return (
		<div className={styles.TitleWrapper}>
			<a href="/mainmenu">
				<img className="Logo" src="../img/Logo.png"></img>
			</a>
			<div className={styles.TitleCityWrapper}>
				<h1 className={styles.TitleText}>Всеместа</h1>
				<i style={{ color: '#909090' }} className="fi fi-sr-marker"></i>
				<p className={styles.TitleCity}>{city}</p>
			</div>
		</div>
	)
}
