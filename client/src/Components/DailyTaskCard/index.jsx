import styles from './styles.module.css'

export const DailyTaskCard = ({ task }) => {
	//  task = {
	// 	  TaskBackgroundColor,
	// 	  TaskId,
	// 	  TaskImage,
	// 	  TaskIsCompleted,
	// 	  TaskName,
	// 	  TaskProgress,
	// 	  TaskText,
	// }
	const refreshButton = () => {
		alert('Меняем  чето')
	}

	return (
		<div className={styles.Card}>
			<div className={styles.DailyTaskTitleWrapper}>
				<div className={styles.DailyTaskTitle}>
					<div className={styles.DailyTaskIcon}>
						<img
							src={'../img/' + task.TaskImage}
							className={styles.DailyTaskImg}
						/>
					</div>
					{/* Нету класса DailyTaskName */}
					<p className="DailyTaskName">{task.TaskName}</p>
				</div>

				{!task.TaskIsCompleted && (
					<div className={styles.DailyTaskButton} onClick={refreshButton}>
						<i className="fi fi-sr-refresh" />
					</div>
				)}
			</div>
			<div className={styles.DailyTaskInfoStatusWrapper}>
				<p>{task.TaskText}</p>
				<div
					style={{
						backgroundColor: task.TaskIsCompleted ? '#CAF05F' : '#EDEDED'
					}}
					className={styles.DailyTaskStatus}
				>
					{task.TaskProgress}
				</div>
			</div>
		</div>
	)
}
