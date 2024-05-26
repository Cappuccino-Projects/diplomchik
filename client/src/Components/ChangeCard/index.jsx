import {
    useGetAllplaceTypesQuery,
    useGetAllplacesQuery
} from '@redux/services/placeTypeApi'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

import { useGetAllChangeTypesQuery } from '@redux/services/changesApi'

function formatDateTime(datetimeString) {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	}
	const date = new Date(datetimeString)
	return date.toLocaleString('ru-RU', options)
}

export const ChangeCard = ({ item }) => {
	const { id, userId, placeId, typeId, timestamp } = item

	const { data: allPlaces, isSuccess: isSuccessAllPlaces } =
		useGetAllplacesQuery()
	const { data: allChangeTypes, isSuccess: isSuccessAllChangeTypes } =
		useGetAllChangeTypesQuery()
	const { data: allPlaceTypes, isSuccess: isSuccessAllPlaceTypes } =
		useGetAllplaceTypesQuery()

	const [formattedPlaceName, setFormattedPlaceName] = useState('')
	const [formattedChangeType, setFormattedChangeType] = useState('')
	const [formattedDateTime, setFormattedDateTime] = useState('')

	useEffect(() => {
		if (
			isSuccessAllPlaces &&
			isSuccessAllChangeTypes &&
			isSuccessAllPlaceTypes
		) {
			const placeName = allPlaces.find((place) => place.id === placeId)
			const placeTypeName = allPlaceTypes.find(
				(type) => type.id === placeName.typeId
			)

			setFormattedPlaceName(placeName.title ? placeName.title : placeTypeName.name)

			setFormattedChangeType(
				allChangeTypes.find((type) => type.id === typeId).name
			)
			setFormattedDateTime(formatDateTime(timestamp))
		}
	}, [allPlaces, allChangeTypes, allPlaceTypes])

	return (
		<div className={styles.Card}>
			<div>{`Место: ${formattedPlaceName}`}</div>
			<div>{`Тип: ${formattedChangeType}`}</div>
			<div>{`Дата: ${formattedDateTime}`}</div>
		</div>
	)
}
