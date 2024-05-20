import { TitleWrapper, MinimizeMenuButton, BackToMainMenu } from '@components'
import { ChatWidget } from '@widgets'
import styles from './styles.module.css'

export const Chat = () => {
	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.Title}>
				<TitleWrapper/>
				<MinimizeMenuButton />
			</div>
			<BackToMainMenu />
			<div className="ChatBlock">
				<ChatWidget />
			</div>
		</div>
	)
}
