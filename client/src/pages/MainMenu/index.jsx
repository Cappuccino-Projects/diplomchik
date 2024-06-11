import { PlacesWrapper, Search, TitleWrapper, UserCard } from '@components'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

import { MainMenuContainer } from './ui'

import { openLogout } from '@redux/slices/modalsSlice'
import { useDispatch } from 'react-redux'

export const MainMenu = (props) => {
	const { places } = props
	const dispatch = useDispatch()

	return (
		<>
			<TitleWrapper />
			<Search />
			<PlacesWrapper places={places} WrapperText="Популярные места" WrapperButtonEnabled={true} />

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
					<button onClick={() => dispatch(openLogout())} className={styles.MenuButton} style={{ width: 'min-content' }}>
						<i className="fi fi-sr-undo-alt" />
						<p>Выйти</p>
					</button>
					{/* TODO перенести в компонент или uikit */}
				</div>
				<UserCard ShowLvl={false} ShowBalance={false} IsItProfilePage={false} />
			</div>
		</>
	)
}
