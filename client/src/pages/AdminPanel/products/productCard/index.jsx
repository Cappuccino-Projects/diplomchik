import { Button } from '@components/Button'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import {
	openDeleteProduct,
	openEditProduct
} from '@app/redux/slices/modalsSlice'
import { getIconPath } from '@shared/api/getIconPath'

export const ProductCard = ({ product }) => {
	const { iconPath, name, price } = product
	const dispatch = useDispatch()
	const openEdit = () => dispatch(openEditProduct(product))
	const openDelete = () => dispatch(openDeleteProduct(product))

	return (
		<div className={styles.productCard}>
			<div className={styles.productCard__image}>
				<img src={getIconPath(iconPath)} />
			</div>
			<div className={styles.productCard__title}>{name}</div>
			<div className={styles.productCard__price}>
				{price} <img src="/img/crystall.png" />
			</div>
			<div className={styles.productCard__buttons}>
				<Button
					variant="icon"
					icon="fi-sr-trash"
					type="button"
					onClick={openDelete}
				/>
				<Button
					variant="icon"
					icon="fi-sr-edit"
					type="button"
					onClick={openEdit}
				/>
			</div>
		</div>
	)
}
