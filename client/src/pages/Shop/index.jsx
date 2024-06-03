import {
	BackToMainMenu,
	ShopItemCard,
	UserCard
} from '@components'

import styles from './styles.module.css'

import { useGetAllProductsQuery } from '@redux/services/productsApi'
import { useGetUserProductsByIdQuery } from '@redux/services/userApi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const Shop = () => {

	const userId = useSelector(state => state.user.user.id)

	const { data: userProducts = [], isFetching: isFetchingUserProducts } =
		useGetUserProductsByIdQuery(userId)

	const { data: allProducts = [], isFetching: isFetchingAllProducts } =
		useGetAllProductsQuery()

	const [avatars, setAvatars] = useState([])
	const [characters, setCharacters] = useState([])

	useEffect(() => {
		if (!isFetchingUserProducts && !isFetchingAllProducts) {
			const userProductIds = userProducts.map((product) => product.productId)
			const shopProduct = allProducts.filter(
			(product) => !userProductIds.includes(product.id)
		)
		setAvatars(shopProduct.filter((item) => item.typeId === 2))
		setCharacters(shopProduct.filter((item) => item.typeId === 1))
		}
		
	}, [userProducts, allProducts])

	return (
		<>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMainMenu />
			</div>
			<UserCard ShowLvl={true} ShowBalance={true} />
			<p className="DailyTasksAbout">
				Зарабатывайте фантики за выполнение ежедневных заданий и обменивайте
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
				<p style={{ marginBottom: '10px' }}>Персонажи</p>

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
		</>
	)
}
