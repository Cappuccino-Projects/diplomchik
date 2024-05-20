import { ShopItemCard } from '@components'
import styles from './styles.module.css'

export const ShopItemsWrapper = ({ items, wrapperText }) => {
	return (
		<div>
			<p style={{ marginBottom: '10px' }}>{wrapperText}</p>

			{items.length > 0 ? (
				<div className={styles.ShopItemsWrapper}>
					{items.map((item) => (
						<ShopItemCard key={item.id} item={item} />
					))}
				</div>
			) : (
				<p style={{ marginBottom: '10px' }}>Пусто</p>
			)}
		</div>
	)
}
