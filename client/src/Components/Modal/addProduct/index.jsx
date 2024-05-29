import { closeModal } from '@app/redux/slices/modalsSlice'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { Button } from '@components/Button'
import { useEffect, useState } from 'react'
import { useGetAllProductTypesQuery } from '@app/redux/services/productTypeApi'
import { useAddProductMutation } from '../../../app/redux/services/productsApi'
import { uploadFile } from '@shared/api/uploadFile'
import { getIconPath } from '@shared/api/getIconPath'

export const AddProduct = () => {
	const { data: productTypes } = useGetAllProductTypesQuery()
	const dispatch = useDispatch()
	const [createProduct] = useAddProductMutation()

	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [typeId, setTypeId] = useState('')
	const [iconPath, setIconPath] = useState()
	const [file, setFile] = useState()

	useEffect(() => {
		if (file) {
			uploadFile(file).then(setIconPath)
		}
	}, [file])

	const onClose = () => dispatch(closeModal())

	const onSubmit = (e) => {
		e.preventDefault()
		createProduct({
			name,
			price,
			typeId,
			iconPath,
			type: productTypes.find((type) => type.id === typeId)?.name
		})
		onClose()
	}

	return (
		<form className={styles.addProduct} onSubmit={onSubmit}>
			<div className={styles.addProduct__title}>Добавление товара</div>
			<div className={styles.addProduct__fields}>
				<label className={styles.addProduct__input}>
					<div>Название</div>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label className={styles.addProduct__select}>
					<div>Тип продукта</div>
					<select value={typeId} onChange={(e) => setTypeId(e.target.value)}>
						{productTypes &&
							productTypes.map((type) => (
								<option value={type.id} key={type.id}>
									{type.name}
								</option>
							))}
					</select>
				</label>
				<label className={styles.addProduct__input}>
					<div>Цена</div>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</label>
				<div className={styles.addProduct__input}>
					<div>Фотография: {file?.name || 'не загружено'}</div>
					<div className={styles.addProduct__fileInput}>
						<div className={styles.addProduct__preview}>
							{iconPath && <img src={getIconPath(iconPath)} />}
						</div>
						<label>
							<input type="file" onChange={(e) => setFile(e.target.files[0])} />
							Загрузить изображение
						</label>
					</div>
				</div>
			</div>
			<div className={styles.addProduct__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.addProduct__button}
					type="button"
				>
					Отмена
				</Button>
				<Button
					variant="primary"
					withBorder
					className={styles.addProduct__button}
					type="submit"
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}
