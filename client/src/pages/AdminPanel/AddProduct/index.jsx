import { useAddProductMutation } from '@app/redux/services/productsApi'
import { useEffect, useState } from 'react'
import styles from '../styles.module.css'
// СДЕЛАТЬ ВЫБОР ФАЙЛОВ
export const AddProduct = () => {
	const [AddProduct] = useAddProductMutation()

	const [name, setName] = useState('')
	const [typeId, setTypeId] = useState(0)
	const [price, setPrice] = useState(0)
	const [iconPath, setIconPath] = useState(null)

	const onSave = async () => {
		if (name && typeId && price && iconPath) {
			const data = {
				name,
				typeId,
				price,
				iconPath
			}
			console.log(data)
			//await AddProduct(data)
		}
	}

	return (
		<div>
			<h1>Добавить товар</h1>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="text"
				value={typeId}
				onChange={(e) => setTypeId(Number(e.target.value))}
			/>
			<input
				type="text"
				value={price}
				onChange={(e) => setPrice(Number(e.target.value))}
			/>
			<input
				className={styles.MenuTextArea}
				type="file"
				accept=".png,.jpg"
				onChange={(e) => {
					setIconPath(
						e.target.files[0].name.replace('.png', '').replace('.jpg', '')
					)
				}}
			/>

			<button onClick={onSave}>Сохранить</button>
		</div>
	)
}
