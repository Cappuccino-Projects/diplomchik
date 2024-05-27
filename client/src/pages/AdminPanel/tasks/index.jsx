import { Button } from '@components/Button'
import AdminPanelWrapper from '../wrapper'
import styles from './styles.module.css'
import TasksList from './tasksList'

export const Tasks = () => {
	return (
		<AdminPanelWrapper>
			<div className={styles.tasks}>
				<h1 className={styles.tasks__title}>Ежедневные задания</h1>
				<Button
					variant="primary"
					icon="fi-sr-plus-small"
					className={styles.tasks__button}
					type="button"
				>
					Новое задание
				</Button>
				<TasksList />
			</div>
		</AdminPanelWrapper>
	)
}
