import styles from './styles.module.css'
import pdf from './Справка.pdf'

export const InfoPDF = () => {
	return (
		<div className={styles.pdf_container}>
			<iframe className={styles.pdf_iframe} src={pdf} height={'100vh'}></iframe>
		</div>
	)
}
