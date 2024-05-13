import {
	BackToMainMenu,
	MinimizeMenuButton,
	UserCard,
	ShopItemsWrapper
} from '@components'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const Shop = () => {
	const { avatars, themes } = useSelector((state) => state.shop)

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
			<ShopItemsWrapper
				Obtained={true}
				shopitems={avatars}
				WrapperText="Рамки для аватара"
			/>
			<ShopItemsWrapper
				Obtained={false}
				shopitems={themes}
				WrapperText="Темы"
			/>
		</div>
	)
}
