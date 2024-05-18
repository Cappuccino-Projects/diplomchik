import { ShopItemCard } from '@components'
import styles from './styles.module.css'

export const ShopItemsWrapper = ({ shopitems, wrapperText }) => {
	return (
		<div>
			<p style={{ marginBottom: '10px' }}>{wrapperText}</p>

			{shopitems.length > 0 ? (
				<div className={styles.ShopItemsWrapper}>
					{shopitems.map((item) => (
						<ShopItemCard key={item.ItemId} item={item} />
					))}
				</div>
			) : (
				<p style={{ marginBottom: '10px' }}>Пусто</p>
			)}
		</div>
	)
}
