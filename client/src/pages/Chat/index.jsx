import { BackToMainMenu, TitleWrapper } from '@components'
import { ChatWidget } from '@widgets'
import styles from './styles.module.css'

export const Chat = () => {
	return (
		<>
			<div className={styles.Title}>
				<TitleWrapper/>
			</div>
			<BackToMainMenu />
			<div className="ChatBlock">
				<ChatWidget />
			</div>
		</>
	)
}
