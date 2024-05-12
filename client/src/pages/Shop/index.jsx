import {
	BackToMainMenu,
	MinimizeMenuButton,
	UserCard,
	ShopItemsWrapper
} from '@components'
import styles from './styles.module.css'

export const Shop = (props) => {
	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMainMenu />
				<MinimizeMenuButton />
			</div>
			<UserCard ShowLvl={true} ShowBalance={false} IsItProfilePage={true} />
			<div className="Card">
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
			</div>
			<p className={styles.TitleText}>Магазин</p>
			<ShopItemsWrapper Obtained = {true}
				shopitems={props.shopitems.filter(
					(CurrentItem) => CurrentItem.ItemCategory === 'Avatar Frame'
				)}
				WrapperText="Рамки для аватара"
			/>
			<ShopItemsWrapper Obtained = {false}
				shopitems={props.shopitems.filter(
					(CurrentItem) => CurrentItem.ItemCategory === 'Theme'
				)}
				WrapperText="Темы"
			/>
		</div>
	)
}
