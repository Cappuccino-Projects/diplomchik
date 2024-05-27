import { closeModal } from '@app/redux/slices/modalsSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.css'
import { Button } from '@components/Button'
import { useEffect, useState } from 'react'
import { useGetAllProductTypesQuery } from '@app/redux/services/productTypeApi'
import { useUpdateProductByIdMutation } from '@app/redux/services/productsApi'

const fileToBase64 = (file, setBase64) => {
	let reader = new FileReader()
	reader.onload = () => {
		const base64 = reader.result
		setBase64(base64)
	}
	reader.readAsDataURL(file)
}

export const EditProduct = () => {
	const product = useSelector((state) => state.modals.data.editProduct)
	const { data: productTypes } = useGetAllProductTypesQuery()
	const dispatch = useDispatch()
	const [updateProduct] = useUpdateProductByIdMutation()

	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [typeId, setTypeId] = useState('')
	const [iconPath, setIconPath] = useState()
	const [file, setFile] = useState()
	const [imgPreview, setImgPreview] = useState()

	useEffect(() => {
		setName(product?.name || '')
		setPrice(product?.price || '')
		setTypeId(product?.typeId || '')
		setIconPath(product?.iconPath || '')
	}, [product])

	useEffect(() => {
		if (file) {
			fileToBase64(file, setImgPreview)
			setIconPath(file.name)
		}
	}, [file])

	const onClose = () => dispatch(closeModal())

	const onSubmit = (e) => {
		e.preventDefault()
		updateProduct({
			id: product.id,
			name,
			price,
			typeId,
			iconPath,
			type: productTypes.find((type) => type.id === typeId)?.name
		})
		onClose()
	}

	return (
		<form className={styles.editProduct} onSubmit={onSubmit}>
			<div className={styles.editProduct__title}>Редактирование задания</div>
			<div className={styles.editProduct__fields}>
				<label className={styles.editProduct__input}>
					<div>Название</div>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label className={styles.editProduct__select}>
					<div>Тип продукта</div>
					<select value={typeId} onChange={(e) => e.target.value}>
						{productTypes &&
							productTypes.map((type) => (
								<option value={type.id} key={type.id}>
									{type.name}
								</option>
							))}
					</select>
				</label>
				<label className={styles.editProduct__input}>
					<div>Цена</div>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</label>
				<div className={styles.editProduct__input}>
					<div>Фотография: {file?.name || 'не загружено'}</div>
					<div className={styles.editProduct__fileInput}>
						<div className={styles.editProduct__preview}>
							{imgPreview && <img src={imgPreview} />}
							{!imgPreview && iconPath && <img src={`/img/${iconPath}.png`} />}
						</div>
						<label>
							<input type="file" onChange={(e) => setFile(e.target.files[0])} />
							Загрузить изображение
						</label>
					</div>
				</div>
			</div>
			<div className={styles.editProduct__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.editProduct__button}
					type="button"
				>
					Отмена
				</Button>
				<Button
					variant="primary"
					withBorder
					className={styles.editProduct__button}
					type="submit"
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}
