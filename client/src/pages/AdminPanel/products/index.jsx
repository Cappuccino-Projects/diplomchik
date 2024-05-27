import { Button } from '@components/Button'
import AdminPanelWrapper from '../wrapper'
import styles from './styles.module.css'
import { useGetAllProductsQuery } from '@app/redux/services/productsApi'
import { ProductsList } from './productsList'

export const Products = () => {
	const { data } = useGetAllProductsQuery()

	console.log(data)

	return (
		<AdminPanelWrapper>
			<div className={styles.products}>
				<h1 className={styles.products__title}>Каталог товаров</h1>
				<Button
					variant="primary"
					icon="fi-sr-plus-small"
					className={styles.products__button}
					type="button"
				>
					Новый товар
				</Button>
				<ProductsList />
			</div>
		</AdminPanelWrapper>
	)
}
