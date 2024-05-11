import { TitleWrapper, MinimizeMenuButton, BackToMainMenu } from '@components'
import { ChatWidget } from '@widgets'
import styles from './styles.module.css'

export const Chat = (props) => {
	const { city } = props

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.Title}>
				<TitleWrapper city={city} />
				<MinimizeMenuButton />
			</div>
			<BackToMainMenu />
			<div className="ChatBlock">
				<ChatWidget />
			</div>
		</div>
	)
}
