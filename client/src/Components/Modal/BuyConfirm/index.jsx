import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import {
	useUpdateUserInfoByIdMutation,
	useBuyProductMutation
} from '@app/redux/services/userApi'

export const BuyConfirm = ({ close }) => {
	const [updateUserInfo] = useUpdateUserInfoByIdMutation()
	const [buyProduct] = useBuyProductMutation()

	const user = useSelector((state) => state.user.user)
	const item = useSelector((state) => state.modals.data.editItemToBuy)

	const onAcceptClick = async () => {
		const updatedUser = {
			...user,
			balance: user.balance - item.price,
			experience: user.experience + 50
		}

		const product = {
			userId: user.id,
			productId: item.id,
			active: 0,
			product: null,
			user: null
		}

		console.log(product)

		await updateUserInfo(updatedUser)
		await buyProduct(product)

		close()
	}
	return (
		<>
			<div className={styles.ModalWindowTitle}>Подтверждение покупки</div>

			<div className={styles.ModalWindowText}>
				Вы действительно хотите купить
				{item.typeId === '1' ? ' персонажа ' : ' аватар '}
				<span style={{ fontWeight: 'bold' }}>{` ${item.name} `}</span>
				за
				<span style={{ fontWeight: 'bold' }}>{` ${item.price} `}</span>
				<img className={styles.SmallImg} src="../img/crystall.png" />?
			</div>

			<div className={styles.ModalWindowButtonsWrapper}>
				<div className={styles.ModalButton} onClick={close}>
					Отмена
				</div>
				<div className={styles.ModalMainButton} onClick={onAcceptClick}>
					Подтвердить
				</div>
			</div>
		</>
	)
}
