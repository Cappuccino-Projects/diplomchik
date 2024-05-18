import {
	BackToMainMenu,
	MinimizeMenuButton,
	UserCard,
	ShopItemsWrapper
} from '@components'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

export const Shop = () => {
	const shopItems = useSelector((state) => state.shop.shop)

	const [avatars, setAvatars] = useState([])
	const [сharacter, setCharacter] = useState([])

	useEffect(() => {
		setAvatars(
			shopItems.filter(
				(item) =>
					item.ItemCategory === 'Avatar Frame' && item.ItemObtained === false
			)
		)

		setCharacter(
			shopItems.filter(
				(item) =>
					item.ItemCategory === 'Character' && item.ItemObtained === false
			)
		)
	}, [shopItems])

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMainMenu />
				<MinimizeMenuButton />
			</div>
			<UserCard ShowLvl={true} ShowBalance={true} />
			<p className="DailyTasksAbout">
				Зарабатывайте помойкоены за выполнение ежедневных заданий и обменивайте
				их на предметы в магазине
			</p>
			<p className={styles.TitleText}>Магазин</p>
			<ShopItemsWrapper shopitems={avatars} wrapperText="Рамки для аватара" />
			<ShopItemsWrapper shopitems={сharacter} wrapperText="Персонажи" />
		</div>
	)
}
