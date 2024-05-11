import { MainMenuItem } from './MainMenuItem'
import styles from './../styles.module.css'

export const MainMenuContainer = () => {
	return (
		<div className={styles.MainMenuButtonsWrapper}>
			<MainMenuItem link="/favourite" label="Избранное" icon="fi fi-sr-heart" />
			<MainMenuItem
				link="/favourite"
				label="Ваши впечатления"
				icon="fi fi-sr-heart"
			/>
			<MainMenuItem link="/favourite" label="Маршруты" icon="fi fi-sr-road" />
			<MainMenuItem
				link="/mapeditmenu"
				label="Редактировать карту"
				icon="fi fi-sr-edit"
			/>
		</div>
	)
}
