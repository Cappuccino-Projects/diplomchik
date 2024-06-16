import { CharacterCard, DailyTasks } from '@components'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import InteractiveMap from '../../Components/interactiveMap/interactiveMap'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

export const Map = () => {
	const [zoom, setZoom] = useState(17)
	const [isShowMenu, setShowMenu] = useState(true)

	const handleZoomIn = () => {
		setZoom((prevZoom) => prevZoom < 18 ? prevZoom + 1 : 18)
	}

	const handleZoomOut = () => {
		setZoom((prevZoom) => (prevZoom > 0 ? prevZoom - 1 : 0))
	}

	return (
		<>
			<div
				className={styles.MenuWrapper}
				style={{
					left: isShowMenu ? '0' : '-100%',
					transition: 'all 0.5s ease-in-out'
				}}
			>
				<button
					className={styles.MinimizeButton}
					onClick={() => setShowMenu(false)}
				>
					<i className="fi-sr-angle-double-left" />
				</button>
				<Outlet />
			</div>

			<div
				className={styles.ExpandMenuButton}
				onClick={() => setShowMenu(true)}
			>
				<i className="fi fi-sr-angle-double-right" />
			</div>

			<div className={styles.MapTopButtonsContainer}>
				<Link to="/mapeditmenu">
					<div className={styles.MapButton}>
						<i className="fi fi-sr-edit" />
					</div>
				</Link>
				<div className={styles.MapButton}>
					<i className="fi fi-sr-map" />
				</div>
				<div className={styles.MapButton}>
					<i className="fi fi-sr-protractor" />
				</div>
			</div>

			<div className={styles.MapSideButtons}>
				<div className={styles.MapSideButtonsContainer}>
					<div className={styles.MapButton} onClick={handleZoomIn}>
						<i className="fi fi-sr-plus-small" />
					</div>
					<div className={styles.MapButton} onClick={handleZoomOut}>
						<i className="fi fi-sr-minus-small" />
					</div>
				</div>

				<div className={styles.MapSideButtonsContainer}>
					<div className={styles.MapButton}>
						<i className="fi fi-sr-man-head" />
					</div>
				</div>
			</div>
			<div className={styles.SideCharacterWrapper}>
				<CharacterCard />
			</div>
			<div className={styles.SideDailyTasksWrapper}>
				<DailyTasks ShowInfo={false} ShowLvl={true} />
			</div>
			<div className={styles.WorldMap}>
				<InteractiveMap
					zoom={zoom}
					flag={true}
					redMarkerPosition={[54.241508, 49.557214]}
				/>
			</div>
		</>
	)
}
