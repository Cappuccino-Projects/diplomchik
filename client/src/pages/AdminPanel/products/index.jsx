import { Button } from '@components/Button'
import AdminPanelWrapper from '../wrapper'
import styles from './styles.module.css'
import { ProductsList } from './productsList'
import { useDispatch } from 'react-redux'
import { openAddProduct } from '../../../app/redux/slices/modalsSlice'

export const Products = () => {
	const dispatch = useDispatch()

	const openAddPopup = () => {
		dispatch(openAddProduct())
	}

	return (
		<AdminPanelWrapper>
			<div className={styles.products}>
				<h1 className={styles.products__title}>Каталог товаров</h1>
				<Button
					variant="primary"
					icon="fi-sr-plus-small"
					className={styles.products__button}
					type="button"
					onClick={openAddPopup}
				>
					Новый товар
				</Button>
				<ProductsList />
			</div>
		</AdminPanelWrapper>
	)
}
