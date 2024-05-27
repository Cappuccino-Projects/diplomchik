import { useGetAllProductsQuery } from '@app/redux/services/productsApi'
import styles from './styles.module.css'
import { ProductCard } from '../productCard'

export const ProductsList = () => {
	const { data, error, isLoading } = useGetAllProductsQuery()

	if (isLoading) {
		return <h1 className={styles.productList__message}>Загрузка...</h1>
	}

	if (error) {
		return <h1 className={styles.productList__message}>Произошла ошибка!</h1>
	}

	return (
		<ul className={styles.productList}>
			{data &&
				data.map((product) => (
					<li key={product.id}>
						<ProductCard product={product} />
					</li>
				))}
		</ul>
	)
}
