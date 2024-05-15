import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { ProgressBar, ModalRewards, ModalNoRewards } from '@components'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { increaseBalance, increaseExp } from '@redux/slices/userSlice'

const CompletedTasks = ({ countCompletedTasks }) => {
	return (
		<div className={styles.DailyTasksIcons}>
			{Array(3)
				.fill()
				.map((_, index) => {
					return index <= countCompletedTasks - 1 ? (
						<div className={styles.DailyTaskIconCompleted}>
							<img className={styles.SmallImg} src="../img/completed.png" />
						</div>
					) : (
						<div className={styles.DailyTaskIconIncompleted}>
							<img className={styles.SmallImg} src="../img/notcompleted.png" />
						</div>
					)
				})}
		</div>
	)
}

export const DailyTasks = ({ ShowInfo = true, ShowLvl = true }) => {
	const dispatch = useDispatch()
	const [isModalActive, setModalActive] = useState(false)

	const { dailyTasksStatus, countCompletedTasks, isChestAvailable } =
		useSelector((state) => state.dailyTasks)

	return (
		<Link to="/dailytasks">
			<div className={styles.DailyTasksWrapper}>
				<div className={styles.DailyTasksStatusWrapper}>
					<p className={styles.DailyTasksTitle}>Ежедневные задания</p>
					<div className={styles.DailyTasksStatus}>{dailyTasksStatus}</div>
				</div>
				{ShowInfo && (
					<p className={styles.DailyTasksAbout}>
						Выполняйте ежедневные задания, чтобы повышать уровень профиля
					</p>
				)}
				<div className={styles.DailyTasksIconsWrapper}>
					<CompletedTasks countCompletedTasks={countCompletedTasks} />
					{/* Сундук */}
					<div
						className={
							isChestAvailable
								? styles.DailyTaskIconCompleted
								: styles.DailyTaskIconIncompleted
						}
						onClick={() => setModalActive(true)}
					>
						<img className={styles.SmallImg} src="../img/chest.png" />
					</div>
				</div>
				{ShowLvl && <ProgressBar />}
			</div>

			{isChestAvailable ? (
				<ModalRewards
					isShowModal={isModalActive}
					act={() => {
						// Награды
						dispatch(increaseBalance(50))
						dispatch(increaseExp(30))

						setModalActive(false)
					}}
					close={() => setModalActive(false)}
					rewards={{
						exp: 30,
						balance: 50
					}}
				/>
			) : (
				<ModalNoRewards
					isShowModal={isModalActive}
					close={() => setModalActive(false)}
				/>
			)}
		</Link>
	)
}
