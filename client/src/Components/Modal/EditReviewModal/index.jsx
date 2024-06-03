import {
	useGetPlaceByIdQuery,
	useGetPlaceTypeByIdQuery
} from '@redux/services/placeTypeApi'
import {
	useGetReviewByIdQuery,
	useUpdateReviewByIdMutation,
	useDeleteReviewMutation
} from '@redux/services/reviewApi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import { useUploadImageMutation } from '@app/redux/services/uploadApi'

export const EditReviewModal = ({ close }) => {
	const reviewId = useSelector(
		(state) => state.modals.data.editRewiewToChange.id
	)
	const { data: review = {}, isSuccess: isSuccessReview } =
		useGetReviewByIdQuery(reviewId)
	const { data: placeData = {}, isSuccess: isSuccessPlace } =
		useGetPlaceByIdQuery(review.placeId)
	const { data: placeTypeData = {}, isSuccess: isSuccessPlaceType } =
		useGetPlaceTypeByIdQuery(placeData.typeId)

	const [updateReview] = useUpdateReviewByIdMutation()
	const [uploadImage] = useUploadImageMutation()
	const [deleteRewiew] = useDeleteReviewMutation()

	const [rating, setRating] = useState(0)
	const [commentInput, setCommentInput] = useState('')
	const [photoPath, setPhotoPath] = useState(null)
	const [place, setPlace] = useState(null)
	const [selectedFile, setSelectedFile] = useState(null)

	useEffect(() => {
		if (isSuccessReview) {
			setPhotoPath(review.photoPath)
			setRating(review.rank)
			setCommentInput(review.comment)
		}
	}, [review])

	useEffect(() => {
		if (isSuccessPlace) {
			setPlace(placeData)
		}
	}, [placeData])

	const saveButton = async () => {
		if (selectedFile) {
			const file = selectedFile
			const formData = new FormData()
			formData.append('files', file, file.name)
			await uploadImage(formData)
		}

		await updateReview({
			...review,
			rank: rating,
			comment: commentInput,
			photoPath: selectedFile ? selectedFile.name : photoPath
		})

		close()
	}

	const deleteRewiewButton = async () => {
		await deleteRewiew(review.id)
		close()
	}

	return (
		<>
			<div className={styles.ModalWindowTitle}>Редактирование отзыва</div>

			<div
				style={{ fontSize: '20px', marginTop: '10px' }}
				className={styles.ModalWindowText}
			>
				<b>Место: {place?.title ? place?.title : placeTypeData.name}</b>
			</div>

			<div
				style={{ fontSize: '14px', color: 'grey' }}
				className={styles.AllplacesButton}
			>
				{`${placeTypeData.name}`}
			</div>

			<div className={styles.ModalWindowText}>Адрес: {place?.address}</div>
			<div style={{ marginTop: '20px' }} className={styles.ModalWindowText}>
				Комментарий:
			</div>
			<input
				type="text"
				style={{ height: '32px' }}
				className="MenuTextArea"
				placeholder="Поделитесь впечатлениями"
				value={commentInput}
				onChange={(e) => setCommentInput(e.target.value)}
			></input>
			<div style={{ marginTop: '10px' }} className={styles.ModalWindowText}>
				Фотографии
			</div>
			<div className="LocationCardImageWrapper">
				{photoPath || selectedFile ? (
					<div className={styles.LocationCardImage}>
						{/* Кнопка сброса */}
						<button
							className={styles.DeleteImageButton}
							onClick={() => {
								setPhotoPath(null)
								setSelectedFile(null)
							}}
						>
							<i className="fi fi-sr-cross-small"></i>
						</button>
						<img
							src={
								selectedFile
									? URL.createObjectURL(selectedFile)
									: `http://places.d3s.ru:9088/bucket/${photoPath}`
							}
							className={styles.LocationImage}
						/>
					</div>
				) : (
					<label className={styles.LocationCardImage}>
						<div className={styles.AddImageButton}>
							<i className="fi fi-sr-plus-small"></i>
						</div>
						<input
							style={{ display: 'none' }}
							type="file"
							accept=".png,.jpg"
							onChange={(e) => setSelectedFile(e.target.files[0])}
						/>
					</label>
				)}
			</div>

			<div style={{ marginTop: '10px' }} className={styles.ModalWindowText}>
				Оценка
			</div>

			<div className="LocationCardImageWrapper">
				{Array(5)
					.fill()
					.map((_, index) => {
						return (
							<button
								key={index}
								onClick={() => setRating(index + 1)}
								className={
									rating === index + 1
										? styles.RatingActive
										: styles.RatingNotActive
								}
							>
								{index + 1}
							</button>
						)
					})}
			</div>
			<div
				style={{ marginTop: '20px' }}
				className={styles.ModalWindowButtonsWrapper}
			>
				<button
					className={styles.ModalButton}
					style={{ border: 'none' }}
					onClick={deleteRewiewButton}
				>
					Удалить
				</button>
				<button
					className={styles.ModalMainButton}
					style={{ border: 'none' }}
					onClick={saveButton}
				>
					Сохранить
				</button>
			</div>
		</>
	)
}
