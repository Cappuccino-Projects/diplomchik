import { useGetPlaceTypeByIdQuery } from '@app/redux/services/placeTypeApi'
import { openAddPlace, openDeletePlace } from '@app/redux/slices/modalsSlice'
import { Button } from '@components/Button'
import { getIconPath } from '@shared/api/getIconPath'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'

export const PlaceCard = ({ place }) => {
	const { typeId, title, address, latitude, longitude, photoPath, typeApplication } = place
	const dispatch = useDispatch()
	const openAdd = () => dispatch(openAddPlace(place))
	const openDelete = () => dispatch(openDeletePlace(place))
	const [type, setType] = useState({})
	const colorApplication = {
		добавление: '#caf05f',
		изменение: '#FDE8B2',
		удаление: '#FF866B'
	}
	const { data: placeType = {}, isFetching: isFetching } = useGetPlaceTypeByIdQuery(typeId)

	useEffect(() => {
		if (!isFetching) {
			setType(placeType)
		} else {
			setType('')
		}
	}, [isFetching, placeType])

	return (
		<div className={styles.placeCard}>
			<div className={styles.placeCard__header}>
				<span className={styles.placeCard__title} style={{ background: colorApplication[typeApplication] }}>
					Заявка на {typeApplication} места
				</span>
				<div className={styles.placeCard__buttons}>
					<Button variant="icon" icon="fi-sr-checkbox" type="button" onClick={openAdd} />
					<Button variant="icon" icon="fi-sr-trash" type="button" onClick={openDelete} />
				</div>
			</div>
			<div className={styles.placeCard__description}>
				<div className={styles.placeCard__image}>
					<img src={getIconPath(photoPath)} alt={title} title={title} />
				</div>
				<div className={styles.placeCard__info}>
					<div className={styles.placeCard__title}>
						<h1 className={styles.placeCard__titleText}>{title}</h1>
						<span className={styles.placeCard__type}>
							<img src={getIconPath(type.icon)} alt={type.name} title={type.name} className={styles.placeCard__typeIcon} />
							{type.name}
						</span>
					</div>
					<div className={styles.placeCard__placeInfo}>Данные о месте:</div>
					<div className={styles.placeCard__address}>
						<span>{address}</span>
						<span>{latitude}</span>
						<span>{longitude}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
