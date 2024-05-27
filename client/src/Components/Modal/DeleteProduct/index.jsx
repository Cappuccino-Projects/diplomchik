import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.css'
import { closeModal } from '@app/redux/slices/modalsSlice'
import { Button } from '@components/Button'
import { useDeleteProductByIdMutation } from '@app/redux/services/productsApi'

export const DeleteProduct = () => {
	const product = useSelector((state) => state.modals.data.deleteProduct)
	const dispatch = useDispatch()
	const [deleteProduct] = useDeleteProductByIdMutation()

	const onClose = () => dispatch(closeModal())
	const onDelete = () => {
		deleteProduct({ id: product.id })
		dispatch(closeModal())
	}

	return (
		<div className={styles.deleteProduct}>
			<div className={styles.deleteProduct__title}>Удаление товара</div>
			<div className={styles.deleteProduct__description}>
				Вы уверены, что хотите удалить товар? Отменить это действие будет
				невозможно
			</div>
			<div className={styles.deleteProduct__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.deleteProduct__button}
				>
					Отмена
				</Button>
				<Button
					variant="danger"
					withBorder
					onClick={onDelete}
					className={styles.deleteProduct__button}
				>
					Удалить
				</Button>
			</div>
		</div>
	)
}
