import { useRef } from 'react'
import ChatButtonStack from '../ChatButtonStack'
import './main.css'

const ChatForm = (props) => {
	const buttonRef = useRef(null)
	const inputRef = useRef(null)
	const { socket } = props

	const onSubmit = (e) => {
		e.preventDefault()

		if (inputRef.current.value) {
			socket.current.emit('chat message', {
				owner: 'USER',
				message: inputRef.current.value,
			})
			inputRef.current.value = ''
			buttonRef.current.disabled = true
		}
	}

	return (
		<form className="chat__form" onSubmit={onSubmit}>
			<div className="chat__input-inline">
				<input
					ref={inputRef}
					placeholder="Введите запрос..."
					className="chat__input-field"
					id="input"
					tabIndex="0"
					autoFocus
					autoComplete="off"
					onChange={(e) => {
						buttonRef.current.disabled = e.target.value === ''
					}}
				/>
				<button ref={buttonRef} disabled className="chat__button-send">
					<img src="/send_button.svg" />
				</button>
			</div>
			<ChatButtonStack socket={socket} />
		</form>
	)
}

export default ChatForm
