import {
	TitleWrapper,
	MinimizeMenuButton,
	Search,
	PlacesWrapper,
	UserCard
} from '@components'
import { Link } from 'react-router-dom'
import { MainMenuContainer } from './ui'
import styles from './styles.module.css'
import { EditReviewModal } from '@components/EditReviewModal'

export const MainMenu = (props) => {
	const { places, city } = props

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.Title}>
				<TitleWrapper/>
				<MinimizeMenuButton />
			</div>
			<Search />
			<PlacesWrapper
				places={places}
				WrapperText="Популярные места"
				WrapperButtonEnabled={true}
			/>

			<div className={styles.MainMenuButtonsWrapper}>
				<MainMenuContainer />
				<div className={styles.MainMenuSmallButtonsWrapper}>
					{/* TODO перенести в компонент или uikit */}
					<Link to="/favourite">
						<div className={styles.MenuButton}>
							<i className="fi fi-sr-info" />
							<p>Справка</p>
						</div>
					</Link>
					{/* TODO перенести в компонент или uikit */}
										<Link to="/favourite">
						<div className={styles.MenuButton}>
							<i className="fi fi-sr-print" />
							<p>Печать</p>
						</div>
					</Link>
					<Link to="/favourite">
						<div className={styles.MenuButton}>
							<i className="fi fi-sr-info" />


							<p>Выйти</p>
						</div>
					</Link>
					{/* TODO перенести в компонент или uikit */}

				</div>
				<UserCard ShowLvl={false} ShowBalance={false} IsItProfilePage={false} />
			</div>
		</div>
	)
}
