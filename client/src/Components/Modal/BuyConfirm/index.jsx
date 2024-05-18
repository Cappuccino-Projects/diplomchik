import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { buyItem } from '@redux/slices/shopSlice'
import { decreaseBalance } from '@redux/slices/userSlice'

export const BuyConfirm = ({ close }) => {
	const dispatch = useDispatch()
	const item = useSelector((state) => state.modals.data.editItemToBuy)

	const onAcceptClick = () => {
		dispatch(decreaseBalance(item.ItemPrice))
		dispatch(buyItem(item.ItemId))

		close()
	}

	return (
		<>
			<div className={styles.ModalWindowTitle}>Подтверждение покупки</div>
			<div className={styles.ModalWindowText}>
				Вы действительно хотите купить
				{item.ItemCategory === 'Theme' ? ' тему ' : ' аватар '}
				<span style={{ fontWeight: 'bold' }}>{` ${item.ItemName} `}</span>
				за
				<span style={{ fontWeight: 'bold' }}>{` ${item.ItemPrice} `}</span>
				<img className={styles.SmallImg} src="../img/crystall.png" />
				?
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
