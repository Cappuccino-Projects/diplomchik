import { MainMenuItem } from './MainMenuItem'
import styles from './../styles.module.css'
import { useSelector } from 'react-redux'

export const MainMenuContainer = () => {
	const user = useSelector((state) => state.user.user)
	return (
		<div className={styles.MainMenuButtonsWrapper}>
			{user.isAdmin ? <MainMenuItem link="/adminpanel" label="Админ-панель" icon="fi fi-sr-shield" /> : null}
			<MainMenuItem link="/starred" label="Избранное" icon="fi fi-sr-heart" />
			<MainMenuItem
				link="/favourite"
				label="Ваши впечатления"
				icon="fi fi-sr-star"
			/>
			{/*<MainMenuItem link="/favourite" label="Маршруты" icon="fi fi-sr-road" />*/}
			<MainMenuItem
				link="/mapeditmenu"
				label="Редактировать карту"
				icon="fi fi-sr-edit"
			/>
		</div>
	)
}
