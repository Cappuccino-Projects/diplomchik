import { PlaceCard } from '../placeCard'
import styles from './styles.module.css'

export const PlacesList = () => {
	const { data, error, isLoading } = {
		data: [
			{
				typeApplication: 'добавление',
				title: 'Кафе “Альянс“',
				typeId: 1,
				address: 'Адрес',
				latitude: 54.1023123,
				longitude: 531.0202,
				photoPath: 'place'
			},
			{
				typeApplication: 'изменение',
				title: 'Кафе “Альянс“',
				typeId: 2,
				address: 'Адрес',
				latitude: 54.1023123,
				longitude: 531.0202,
				photoPath: 'place1'
			},
			{
				typeApplication: 'удаление',
				title: 'Кафе “Альянс“',
				typeId: 3,
				address: 'Адрес',
				latitude: 54.1023123,
				longitude: 531.0202,
				photoPath: 'place2'
			}
		],
		error: null,
		isLoading: false
	}

	if (isLoading) {
		return <h1 className={styles.placesList__message}>Загрузка...</h1>
	}

	if (error) {
		return <h1 className={styles.placesList__message}>Произошла ошибка!</h1>
	}

	return (
		<ul className={styles.placesList}>
			{data &&
				data.map((place) => (
					<li key={place.id} className={styles.placesList__item}>
						<PlaceCard place={place} />
					</li>
				))}
		</ul>
	)
}
