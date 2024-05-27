import { useUpdateDailyTaskByIdMutation } from '@app/redux/services/dailyTasksApi'
import { closeModal } from '@app/redux/slices/modalsSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { Button } from '@components/Button'
import { useEffect, useState } from 'react'

const fileToBase64 = (file, setBase64) => {
	let reader = new FileReader()
	reader.onload = () => {
		const base64 = reader.result
		setBase64(base64)
	}
	reader.readAsDataURL(file)
}

export const EditDailyTask = () => {
	const task = useSelector((state) => state.modals.data.editDailyTask)
	const dispatch = useDispatch()
	const [updateTask] = useUpdateDailyTaskByIdMutation()

	const [title, setTitle] = useState('')
	const [expAward, setExp] = useState('')
	const [description, setDescription] = useState('')
	const [iconPath, setIconPath] = useState()
	const [file, setFile] = useState()
	const [imgPreview, setImgPreview] = useState()

	useEffect(() => {
		setTitle(task?.title || '')
		setDescription(task?.description || '')
		setExp(task?.expAward || '')
		setIconPath(task?.iconPath || '')
	}, [task])

	useEffect(() => {
		if (file) {
			fileToBase64(file, setImgPreview)
			setIconPath(file.name)
		}
	}, [file])

	const onClose = () => dispatch(closeModal())

	const onSubmit = (e) => {
		e.preventDefault()
		updateTask({
			id: task.id,
			title,
			description,
			expAward,
			iconPath
		})
		onClose()
	}

	return (
		<form className={styles.editTask} onSubmit={onSubmit}>
			<div className={styles.editTask__title}>Редактирование задания</div>
			<div className={styles.editTask__fields}>
				<label className={styles.editTask__input}>
					<div>Название</div>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label className={styles.editTask__input}>
					<div>Опыт</div>
					<input
						type="number"
						value={expAward}
						onChange={(e) => setExp(e.target.value)}
					/>
				</label>
				<label className={styles.editTask__input}>
					<div>Описание</div>
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<div className={styles.editTask__input}>
					<div>Фотография: {file?.name || 'не загружено'}</div>
					<div className={styles.editTask__fileInput}>
						<div className={styles.editTask__preview}>
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
			<div className={styles.editTask__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.editTask__button}
					type="button"
				>
					Отмена
				</Button>
				<Button
					variant="primary"
					withBorder
					className={styles.editTask__button}
					type="submit"
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}
