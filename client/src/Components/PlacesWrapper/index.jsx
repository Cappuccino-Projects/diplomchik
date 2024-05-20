import { PlaceIcon } from '@components/PlaceIcon'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const PlacesWrapper = (props) => {
	return (
		<div className={styles.placesBlock}>
			<div className={styles.BlockTitleWrapper}>
				<p className={styles.BlockTitleText}>{props.WrapperText}</p>
				{props.WrapperButtonEnabled && (
					<Link to="/allplaces">
						<div className={styles.AllplacesButton}>Все места</div>
					</Link>
				)}
			</div>

			<div className={styles.placesWrapper} style={{ display: 'block' }}>
				{props.places?.map((CurrentPlace) => (
					<div key={CurrentPlace.id}>
						<p>{CurrentPlace.title ? CurrentPlace.title : 'Unknown'}</p>
						<PlaceIcon place={CurrentPlace} title={CurrentPlace.title} typeId={CurrentPlace.typeId} />

						<p>{CurrentPlace.typeId}</p>
						<p>{CurrentPlace.description ? CurrentPlace.description : 'No description'}</p>
						<br />
					</div>
				))}
			</div>
		</div>
	)
}
