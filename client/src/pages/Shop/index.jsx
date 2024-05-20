import {
	BackToMainMenu,
	MinimizeMenuButton,
	UserCard,
	ShopItemCard
} from '@components'

import styles from './styles.module.css'

import { useGetAllProductsQuery } from '@redux/services/productsApi'
import { useGetUserProductsByIdQuery } from '@redux/services/userApi'

export const Shop = () => {
	// !!! activeUserId
	const activeUserId = 1

	const { data: userProducts = [], isFetching: isFetchingUserProducts } =
		useGetUserProductsByIdQuery(activeUserId)

	const { data: allProducts = [], isFetching: isFetchingAllProducts } =
		useGetAllProductsQuery()

	const userProductIds = userProducts.map((product) => product.productId)
	const shopProduct = allProducts.filter(
		(product) => !userProductIds.includes(product.id)
	)

	const avatars = shopProduct.filter((item) => item.typeId === 2)
	const characters = shopProduct.filter((item) => item.typeId === 1)

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

			<div>
				<p style={{ marginBottom: '10px' }}>Рамки для аватара</p>

				{avatars.length > 0 ? (
					<div className={styles.ShopItemsWrapper}>
						{avatars.map((item) => (
							<ShopItemCard key={item.id} item={item} />
						))}
					</div>
				) : (
					<p style={{ marginBottom: '10px' }}>Пусто</p>
				)}
			</div>
			<div>
				<p style={{ marginBottom: '10px' }}>Рамки для аватара</p>

				{characters.length > 0 ? (
					<div className={styles.ShopItemsWrapper}>
						{characters.map((item) => (
							<ShopItemCard key={item.id} item={item} />
						))}
					</div>
				) : (
					<p style={{ marginBottom: '10px' }}>Пусто</p>
				)}
			</div>
		</div>
	)
}
