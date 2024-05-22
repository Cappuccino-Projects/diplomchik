import { BackToMainMenu, MinimizeMenuButton, UserCard } from '@components'
import { InventoryItemCard } from '@components/InventoryItemCard'
import { useGetAllProductsQuery } from '@redux/services/productsApi'
import { useGetUserProductsByIdQuery } from '@redux/services/userApi'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'

export const Inventory = () => {
	const [avatars, setAvatars] = useState([])
	const [characters, setCharacters] = useState([])
	// const shopItems = useSelector((state) => state.shop.shop)

	// !!! Сюда втыкать активного пользователя !!!
	const activeUserId = 1

	const { data: userProducts = [], isFetching: isFetchingUserProducts } =
		useGetUserProductsByIdQuery(activeUserId)
	const { data: allProducts = [], isFetching: isFetchingAllProducts } =
		useGetAllProductsQuery()

	useEffect(() => {
		if (!isFetchingUserProducts && !isFetchingAllProducts) {
			const userProductIds = userProducts.map((up) => up.productId)
			const userProductsList = allProducts
				.filter((p) => userProductIds.includes(p.id))
				.map((p) => {
					const userProduct = userProducts.find((up) => up.productId === p.id)
					return { ...p, active: userProduct.active }
				})

			/// !!! типы из бд
			setAvatars(userProductsList.filter((item) => item.typeId === 2))
			setCharacters(userProductsList.filter((item) => item.typeId === 1))
		}
	}, [userProducts, allProducts])

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

			<div>
				<p style={{ marginBottom: '10px' }}>Рамки для аватара</p>

				{avatars.length > 0 ? (
					<div className={styles.ShopItemsWrapper}>
						{avatars.map((item) => (
							<InventoryItemCard key={item.id} item={item} />
						))}
					</div>
				) : (
					<p style={{ marginBottom: '10px' }}>Пусто</p>
				)}
			</div>

			<div>
				<p style={{ marginBottom: '10px' }}>Персонажи</p>

				{characters.length > 0 ? (
					<div className={styles.ShopItemsWrapper}>
						{characters.map((item) => (
							<InventoryItemCard key={item.id} item={item} />
						))}
					</div>
				) : (
					<p style={{ marginBottom: '10px' }}>Пусто</p>
				)}
			</div>
		</div>
	)
}
