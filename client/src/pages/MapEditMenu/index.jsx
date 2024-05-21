import { TitleWrapper, MinimizeMenuButton, BackToMainMenu, UserCard } from '@components'
import  EditMarker  from '@components/interactiveMap/EditMarker'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openGetRewards, openRewardsNotAvalible, openAddPlaceToMap } from '@redux/slices/modalsSlice'
import { updateMarker } from '@app/redux/slices/locationsSlice'

export const MapEditMenu = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
	const [showEditMarker, setShowEditMarker] = useState(false);
  const dispatch = useDispatch()

  const openModal = (isRewardsAvailable) => {
    setIsModalOpen(true)
    if (isRewardsAvailable) {
      dispatch(openAddPlaceToMap())
    } else {
      dispatch(openAddPlaceToMap())
    }
  }

  const selectedMarker = useSelector((state) => (state.markers ? state.markers.selected : undefined))
  const markers = useSelector((state) => (state.markers ? state.markers.markers : undefined))
  const [marker, setMarker] = useState(selectedMarker)

  const handleEdit = (event) => {
    event.preventDefault();

    const updatedMarker = {
      ...selectedMarker,
      [event.target.name]: event.target.value, // Update the property of the selected marker that corresponds to the name of the input field
    };

    dispatch(updateSelectedMarker(updatedMarker)); // Dispatch the updateSelectedMarker action with the updated marker as the payload
  };

	console.log('selectedMarker', selectedMarker)
	console.log('markers', markers)

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.Title}>
				<TitleWrapper city={props.city} />
				<MinimizeMenuButton />
			</div>
			<BackToMainMenu />
			<p className={styles.TitleText}>Редактирование карты</p>
			<div style={{ marginBottom: 'auto' }} className={styles.MainMenuButtonsWrapper}>
				<div className={styles.MenuButton} onClick={openModal}>
					<i className="fi fi-sr-add" />
					<p>Добавить объект</p>
				</div>
				
				<EditMarker />
				
				<div>


				<div>
      <button onClick={() => setShowEditMarker(true)}>Edit Marker</button>
      {showEditMarker && <EditMarker />}
    </div>


				</div>

				<Link to="/favourite">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-edit" />
						<p>Редактировать объект</p>
					</div>
				</Link>

				<Link to="/favourite">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-delete" />
						<p>Удалить объект</p>
					</div>
				</Link>

				<Link to="/favourite">
					<div className={styles.MainMenuButton}>
						<i className="fi fi-sr-star" />
						<p>Предложения</p>
					</div>
				</Link>
			</div>
			<UserCard ShowLvl={false} ShowBalance={false} IsItProfilePage={false} />
		</div>
	)
}
