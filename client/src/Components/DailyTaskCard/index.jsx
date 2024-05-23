import styles from './styles.module.css'

export const DailyTaskCard = ({ task }) => {
	const { id, statusId, title, description, expAward, iconPath } = task

	const isRefreshAvalible = true

	return (
		<div className={styles.Card}>
			<div className={styles.DailyTaskTitleWrapper}>
				<div className={styles.DailyTaskTitle}>
					<div className={styles.DailyTaskIcon}>
						<img
							src={`../img/${iconPath}.png`}
							className={styles.DailyTaskImg}
						/>
					</div>
					<p>{title}</p>
				</div>

				{statusId !== 4 && isRefreshAvalible && (
					<>
						<div
							className={styles.DailyTaskButton}
							onClick={() => alert('Ок')}
						>
							<i className="fi-sr-check" />
						</div>

						<div
							className={styles.DailyTaskButton}
							onClick={() => alert('Замена не доступна')}
						>
							<i className="fi fi-sr-refresh" />
						</div>
					</>
				)}
			</div>

			<div className={styles.DailyTaskInfoStatusWrapper}>
				<p>{description}</p>

				<div
					style={{
						backgroundColor:
							statusId === 4 && isRefreshAvalible ? '#CAF05F' : '#EDEDED'
					}}
					className={styles.DailyTaskStatus}
				>
					{statusId === 4 ? 'Выполнено' : 'Выполняется'}
				</div>
			</div>
		</div>
	)
}
