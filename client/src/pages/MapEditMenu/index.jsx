import {
	TitleWrapper,
	MinimizeMenuButton,
	BackToMainMenu,
	UserCard
} from '@components'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const MapEditMenu = (props) => {
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
				<Link to="/favourite">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-add" />
						<p>Добавить объект</p>
					</div>
				</Link>
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
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-road" />
						<p>Добавить маршрут</p>
					</div>
				</Link>
				<Link to="/favourite">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-edit" />
						<p>Редактировать маршрут</p>
					</div>
				</Link>
				<Link to="/favourite">
					<div className={styles.MenuButton}>
						<i className="fi fi-sr-delete" />
						<p>Удалить маршрут</p>
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
