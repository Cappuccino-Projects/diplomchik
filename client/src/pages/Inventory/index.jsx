import {
	BackToMainMenu,
	MinimizeMenuButton,
	ShopItemsWrapper,
	UserCard
} from '@components'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const Inventory = () => {
	const shopItems = useSelector((state) => state.shop.shop)

	const avatars = shopItems.filter(
		(item) => item.ItemCategory === 'Avatar Frame' && item.ItemObtained === true
	)

	const character = shopItems.filter(
		(item) => item.ItemCategory === 'Character' && item.ItemObtained === true
	)

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
			<ShopItemsWrapper shopitems={avatars} wrapperText="Рамки для аватара" />
			<ShopItemsWrapper shopitems={character} wrapperText="Персонаж" />
		</div>
	)
}
