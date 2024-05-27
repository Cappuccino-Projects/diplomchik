import styles from './styles.module.css'

const getCalssNames = (variant, withBorder, className) => {
	const classNames = [styles.button]
	if (variant === 'primary') classNames.push(styles.button_primary)
	if (variant === 'secondary') classNames.push(styles.button_secondary)
	if (variant === 'danger') classNames.push(styles.button_danger)
	if (variant === 'icon') classNames.push(styles.button_icon)
	if (withBorder) classNames.push(styles.button_withBorder)

	if (className) classNames.push(className)
	return classNames.join(' ')
}

export const Button = (props) => {
	const { children, className, icon, variant, withBorder, ...otherProps } =
		props

	return (
		<button
			className={getCalssNames(variant, withBorder, className)}
			{...otherProps}
		>
			{children}
			{icon && <i className={icon} />}
		</button>
	)
}
