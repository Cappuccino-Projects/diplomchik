import { LocationCard } from '@components/LocationCard'
import {
	useGetAllplaceTypesQuery,
	useGetAllplacesQuery
} from '@redux/services/placeTypeApi'
import { useGetAllreviewQuery } from '@redux/services/reviewApi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export const LocationsWrapper = () => {
	const [currentList, setCurrentList] = useState([])
	const user = useSelector((state) => state.user.user)

	const { data: allRewiews = [], isSuccess: isSuccessAllRewiews } =
		useGetAllreviewQuery()
	const { data: allPlaces = [], isSuccess: isSuccessAllPlaces } =
		useGetAllplacesQuery()
	const { data: allPlaceTypes = [], isSuccess: isSuccessAllPlaceTypes } =
		useGetAllplaceTypesQuery()

	useEffect(() => {
		if (isSuccessAllRewiews && isSuccessAllPlaces && isSuccessAllPlaceTypes) {
			const userRewiews = allRewiews.filter((item) => item.userId === user.id)

			const rewiews = userRewiews.map((rewiews) => {
				const place = allPlaces.find((place) => place.id === rewiews.placeId)
				const obj = {
					id: rewiews.id,
					userid: user.id,
					rank: rewiews.rank,
					place: place,
					placeType: allPlaceTypes.find(
						(placeType) => placeType.id === place.typeId
					),
					comment: rewiews.comment,
					photoPath: rewiews.photoPath
				}
				return obj
			})

			setCurrentList(rewiews)
		}
	}, [allRewiews, allPlaces, allPlaceTypes])

	return (
		<>
			<h3>{`Отзывы: ${currentList.length}`}</h3>
			<div className={styles.CardsWrapper}>
				{currentList.map((item) => (
					<LocationCard key={item.id} item={item} />
				))}
			</div>
		</>
	)
}
