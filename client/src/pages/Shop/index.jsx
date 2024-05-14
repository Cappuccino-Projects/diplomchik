import {
	BackToMainMenu,
	MinimizeMenuButton,
	UserCard,
	ShopItemsWrapper
} from '@components'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const Shop = () => {
	const shopItems = useSelector((state) => state.shop.shop)

	const avatars = shopItems.filter(
		(item) =>
			item.ItemCategory === 'Avatar Frame' && item.ItemObtained === false
	)

	const themes = shopItems.filter(
		(item) => item.ItemCategory === 'Theme' && item.ItemObtained === false
	)

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMainMenu />
				<MinimizeMenuButton />
			</div>
			<UserCard ShowLvl={true} ShowBalance={true} />
			{/* <div className="Card">
				<div className={styles.UserBalanceWrapper}>
					<p className="UserCardText">Баланс</p>
					<div className="UserBalance">
						<p className="UserCardText">542 фантики</p>
						<img className="SmallImg" src="../img/crystall.png" />
					</div>
				</div>
				<p className="DailyTasksAbout">
					Зарабатывайте помойкоены за выполнение ежедневных заданий и
					обменивайте их на предметы в магазине
				</p>
			</div> */}
			<p className="DailyTasksAbout">
				Зарабатывайте помойкоены за выполнение ежедневных заданий и обменивайте
				их на предметы в магазине
			</p>
			<p className={styles.TitleText}>Магазин</p>

			<ShopItemsWrapper shopitems={avatars} wrapperText="Рамки для аватара" />
			<ShopItemsWrapper shopitems={themes} wrapperText="Темы" />
		</div>
	)
}
