import {
	BackToMainMenu,
	MinimizeMenuButton,
	ShopItemsWrapper,
	UserCard
} from '@components'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const Inventory = () => {
	const { avatars } = useSelector((state) => state.shop)

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMainMenu />
				<MinimizeMenuButton />
			</div>
			<UserCard ShowLvl={true} ShowBalance={true} />
			<p className={styles.TitleText}>Инвентарь</p>
			<p className="DailyTasksAbout">
				Зарабатывайте фантики за выполнение ежедневных заданий и обменивайте их
				на предметы в магазине
			</p>
			<ShopItemsWrapper
				Obtained={false}
				shopitems={avatars}
				WrapperText="Рамки для аватара"
			/>
		</div>
	)
}
