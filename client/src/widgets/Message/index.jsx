import './main.css'

const Message = (props) => {
	return (
		<li
			className={
				props.owner === 'USER'
					? 'chat__message-item_user'
					: 'chat__message-item_bot'
			}
			style={{whiteSpace: "pre-line", display: 'block'}}
			dangerouslySetInnerHTML={{__html: props.message}}
		>
		</li>
	)
}

export default Message
