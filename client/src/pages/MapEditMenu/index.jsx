import {
	TitleWrapper,
	MinimizeMenuButton,
	BackToMainMenu,
	UserCard
} from '@components'

import { Link } from 'react-router-dom'
import styles from './styles.module.css'

import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import AddMarker from '@components/interactiveMap/AddMarker'
import EditMarker from '@components/interactiveMap/EditMarker'
import RemoveMarker from '@components/interactiveMap/RemoveMarker'

import { ModalWindow } from '@components/Modal/ModalWindow'

export const MapEditMenu = (props) => {
	const [showAddMarker, setShowAddMarker] = useState(false)
	const [showEditMarker, setShowEditMarker] = useState(false)
	const [showRemoveMarker, setShowRemoveMarker] = useState(false)


	const handleAddClose = () => {
		setShowAddMarker(false)
	}

	const handleClose = () => {
		setShowRemoveMarker(false)
	}

	const handleEditClose = () => {
		setShowEditMarker(false)
	}



	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.Title}>
				<TitleWrapper city={props.city} />
				<MinimizeMenuButton />
			</div>
			<BackToMainMenu />
			<p className={styles.TitleText}>Редактирование карты</p>
			<div
				style={{ marginBottom: 'auto' }}
				className={styles.MainMenuButtonsWrapper}
			>




				<div>
					<div
						className={styles.MenuButton}
						onClick={() => setShowAddMarker(!showAddMarker)}
					>
						<i className="fi fi-sr-add" />
						<p>{showAddMarker ? 'Добавить объект' : 'Добавить объект'}</p>
					</div>
					<ModalWindow isOpen={showAddMarker}>
						<AddMarker onClose={handleAddClose} />
					</ModalWindow>
				</div>



				<div>
					<div
						className={styles.MenuButton}
						onClick={() => setShowEditMarker(!showEditMarker)}
					>
						<i className="fi fi-sr-edit" />
						<p>
							{showEditMarker ? 'Редактировать объект' : 'Редактировать объект'}
						</p>
					</div>
					<ModalWindow isOpen={showEditMarker}>
						<EditMarker onClose={handleEditClose} />
					</ModalWindow>
				</div>





				<div>
					<div
						className={styles.MenuButton}
						onClick={() => setShowRemoveMarker(true)}
					>
						<i className="fi fi-sr-delete" />
						<p>Удалить объект</p>
					</div>
					<ModalWindow isOpen={showRemoveMarker}>
						<RemoveMarker onClose={handleClose} />
					</ModalWindow>
				</div>
				<Link to="/usersuggestions">
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
