import './main.css'

const Message = (props) => {

	const { socket } = props

	const sendMessage = (msg) => {
		if (socket === undefined || socket === null) return

		if (msg === 'На карте') {
			console.log('Поиск на карте');
			
			return
		}

		socket.current.emit('chat message', {
			owner: 'USER',
			message: msg
		})
	}

	return (
		<div className='msg'>
			<li
				className={
					props.owner === 'USER'
					? 'chat__message-item_user'
					: 'chat__message-item_bot'
				}
				style={{whiteSpace: "pre-line", display: 'block'}}
				>
				<div dangerouslySetInnerHTML={{__html: props.message}}></div>
			</li>
			{(Array.isArray(props.inlineButtons) && props.inlineButtons.length > 0 ? <div className='buttons__container'>
				{
					props.inlineButtons.map((button, index) =>
						<button key={index} onClick={() => sendMessage(button.command)}>{button.title}</button>
					)
				}
			</div> : null)}
		</div>
	)
}

export default Message
