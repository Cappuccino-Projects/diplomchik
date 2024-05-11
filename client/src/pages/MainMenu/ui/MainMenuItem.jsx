import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const MainMenuItem = (props) => {
	const { link, label, icon } = props

	return (
		<Link to={link}>
			<div className={styles.MenuButton}>
				<i className={icon} />
				<p>{label}</p>
			</div>
		</Link>
	)
}
