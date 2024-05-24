import { DailyTasks } from '@components'
import { Outlet } from 'react-router-dom'
import { CharacterCard } from '@components'
import styles from './styles.module.css'
import InteractiveMap from '../../Components/InteractiveMap/InteractiveMap'
import { useState } from 'react'

export const Map = () => {
	const [zoom, setZoom] = useState(20)

	const handleZoomIn = () => {
		setZoom((prevZoom) => prevZoom + 1)
	}

	const handleZoomOut = () => {
		setZoom((prevZoom) => (prevZoom > 0 ? prevZoom - 1 : 0))
	}

	return (
		<>
			<Outlet />
			<div className={styles.ExpandMenuButton}>
				<i className="fi fi-sr-angle-double-right" />
			</div>
			<div className={styles.MapTopButtonsContainer}>
				<div className={styles.MapButton}>
					<i className="fi fi-sr-edit" />
				</div>
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
				<InteractiveMap zoom={zoom} flag={true} redMarkerPosition={[54.241508, 49.557214]} />
			</div>
		</>
	)
}
