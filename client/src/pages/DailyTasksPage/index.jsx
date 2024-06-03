import {
	BackToMainMenu,
	DailyTasks,
	DailyTasksWrapper,
	UserCard
} from '@components'
import { Link } from 'react-router-dom'

import styles from './styles.module.css'

export const DailyTasksPage = () => {
	return (
		<>
			<div className={styles.Title}>
				<BackToMainMenu />
			</div>

			<UserCard />

			<div className={styles.MainMenuButtonsWrapper}>
				<Link to="/shop">
					<div className={styles.MainMenuButton}>
						<img className={styles.SmallImg} src="../img/shop.png" />
						<p>В магазин</p>
					</div>
				</Link>
			</div>

			<DailyTasks ShowInfo={true} ShowLvl={false} />

			<div>
				<p style={{ marginBottom: '5px' }}>Прогресс выполнения</p>
				<p className={styles.DailyTasksAbout}>
					Вы можете поменять ежедневное задание 1 раз в день
				</p>
			</div>

			<DailyTasksWrapper />
		</>
	)
}
