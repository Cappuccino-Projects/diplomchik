import { TitleWrapper, MinimizeMenuButton, BackToMainMenu, UserCard } from '@components'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { openGetRewards, openRewardsNotAvalible, openAddPlaceToMap } from '@redux/slices/modalsSlice'

export const MapEditMenu = (props) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useDispatch()

	const openModal = (isRewardsAvailable) => {
		setIsModalOpen(true)
		if (isRewardsAvailable) {
			dispatch(openAddPlaceToMap())
		} else {
			dispatch(openAddPlaceToMap())
		}
	}

	// const closeModal = () => {
	// 		setIsModalOpen(false);
	// };

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
				{/* <div>
					<div className={styles.MenuButton} onClick={() => openModal(true)}>
						Open Modal
					</div>
					{isModalOpen && <div className={styles.Modal}></div>}
				</div> */}

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
