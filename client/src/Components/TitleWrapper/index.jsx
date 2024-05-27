import { geolocation } from '@shared/api'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export const TitleWrapper = ({ customTitle = null }) => {
	const [city, setCity] = useState('Определяем город...')

	useEffect(() => {
		if (!customTitle) {
			const getCity = () => {
				navigator.geolocation.getCurrentPosition(
					async (data) => {
						const y = await geolocation(
							data.coords.latitude,
							data.coords.longitude
						)
						setCity(y.data.features[0].properties.city ?? 'Город не определён')
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
			getCity()
		}
	}, [])

	return (
		<div className={styles.TitleWrapper}>
			<a href="/mainmenu">
				<img className="Logo" src="../img/Logo.png"></img>
			</a>
			<div className={styles.TitleCityWrapper}>
				<h1 className={styles.TitleText}>Всеместа</h1>
				{!customTitle && (
					<i style={{ color: '#909090' }} className="fi fi-sr-marker" />
				)}
				<p className={styles.TitleCity}>{customTitle || city}</p>
			</div>
		</div>
	)
}
