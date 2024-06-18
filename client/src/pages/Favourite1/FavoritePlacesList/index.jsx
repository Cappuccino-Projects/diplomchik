import { useGetAllreviewQuery } from '@redux/services/reviewApi'
import { useGetFavoritesByUserIdQuery } from '@redux/services/userApi'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FavoritePlaceCard } from '../FavoritePlaceCard'
import styles from './styles.module.css'

export const FavoritePlacesList = ({ userId }) => {
	const dispatch = useDispatch()

	const [favorites, setFavorites] = useState([])

	const { data: AllFavorites = [], isFetching: isFetchingAllFavorites, error, isLoading } = useGetFavoritesByUserIdQuery(userId)
	const { data: reviews = [] } = useGetAllreviewQuery()

	useEffect(() => {
		if (!isFetchingAllFavorites) {
			setFavorites(AllFavorites)
		} else {
			setFavorites([])
		}
	}, [AllFavorites, isFetchingAllFavorites])


	if (isLoading) return <div className={styles.FavoritePlaceList__loading}>Загрузка...</div>

	if (error) return <div className={styles.FavoritePlaceList__error}>Произошла ошибка!</div>

	return (
		<ul className={styles.FavoritePlaceList}>
			{favorites.map((favorite, index) => (
				<li key={index} className={styles.FavoritePlaceList__item}>
					<FavoritePlaceCard favorite={favorite} review={reviews[index]}/>
				</li>
			))}
		</ul>
	)
}