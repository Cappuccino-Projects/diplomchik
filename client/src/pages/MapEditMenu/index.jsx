import { TitleWrapper, MinimizeMenuButton, BackToMainMenu, UserCard } from '@components'

import { Link } from 'react-router-dom'
import styles from './styles.module.css'

import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

import EditMarker from '@components/interactiveMap/EditMarker'
import AddMarker from '@components/interactiveMap/AddMarker'

export const MapEditMenu = (props) => {
	const [showEditMarker, setShowEditMarker] = useState(false)
	const [showAddMarker, setShowAddMarker] = useState(false)


	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.Title}>
				<TitleWrapper city={props.city} />
				<MinimizeMenuButton />
			</div>
			<BackToMainMenu />
			<p className={styles.TitleText}>Редактирование карты</p>
			<div style={{ marginBottom: 'auto' }} className={styles.MainMenuButtonsWrapper}>



				{/* <div className={styles.MenuButton}>
					<i className="fi fi-sr-add" />
					<p>Добавить объект</p>
				</div> */}

				<div>
						<div className={styles.MenuButton} onClick={() => setShowAddMarker(!showAddMarker)}>
							<i className="fi fi-sr-add" />
							<p>{showAddMarker ? 'Добавить объект' : 'Добавить объект'}</p>
						</div>
					{showAddMarker && <AddMarker />} 
				</div>



				<div>
						<div className={styles.MenuButton} onClick={() => setShowEditMarker(!showEditMarker)}>
							<i className="fi fi-sr-edit" />
							<p>{showEditMarker ? 'Редактировать объект' : 'Редактировать объект'}</p>
						</div>
					{showEditMarker && <EditMarker />} 
				</div>

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
