import { useCreateDailyTaskMutation } from '@app/redux/services/dailyTasksApi'
import { closeModal } from '@app/redux/slices/modalsSlice'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { Button } from '@components/Button'
import { useEffect, useState } from 'react'
import { getIconPath } from '@shared/api/getIconPath'
import { uploadFile } from '@shared/api/uploadFile'

export const AddDailyTask = () => {
	const dispatch = useDispatch()
	const [createTask] = useCreateDailyTaskMutation()

	const [title, setTitle] = useState('')
	const [expAward, setExp] = useState('')
	const [description, setDescription] = useState('')
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
		createTask({
			title,
			description,
			expAward,
			iconPath
		})
		onClose()
	}

	return (
		<form className={styles.createTask} onSubmit={onSubmit}>
			<div className={styles.createTask__title}>Добавление задания</div>
			<div className={styles.createTask__fields}>
				<label className={styles.createTask__input}>
					<div>Название</div>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label className={styles.createTask__input}>
					<div>Опыт</div>
					<input
						type="number"
						value={expAward}
						onChange={(e) => setExp(e.target.value)}
					/>
				</label>
				<label className={styles.createTask__input}>
					<div>Описание</div>
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<div className={styles.createTask__input}>
					<div>Фотография: {file?.name || 'не загружено'}</div>
					<div className={styles.createTask__fileInput}>
						<div className={styles.createTask__preview}>
							{iconPath && <img src={getIconPath(iconPath)} />}
						</div>
						<label>
							<input type="file" onChange={(e) => setFile(e.target.files[0])} />
							Загрузить изображение
						</label>
					</div>
				</div>
			</div>
			<div className={styles.createTask__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.createTask__button}
					type="button"
				>
					Отмена
				</Button>
				<Button
					variant="primary"
					withBorder
					className={styles.createTask__button}
					type="submit"
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}
