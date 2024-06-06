import { useEffect, useRef, useState } from 'react'
import ChatContext, { initial } from './../../app/context'
import ChatForm from '../ChatForm'
import ChatView from '../ChatView'
import { io } from 'socket.io-client'
import './main.css'

export const ChatWidget = () => {
	const socketRef = useRef(null)
	const [chat, setChat] = useState(initial)
	const [buttonsHeight, setButtonsHeight] = useState(0)
	const [payload, setPayload] = useState({})

	useEffect(() => {
		socketRef.current = io(import.meta.env.VITE_CHAT_DOMAIN)

		if (socketRef.current === undefined) return

		socketRef.current?.on('chat message', (msg) => {
			const message = {
				owner: msg.owner,
				message: msg.message,
				buttons: msg.buttons ?? [],
				inlineButtons: msg.inlineButtons ?? []
			}

			navigator.geolocation.getCurrentPosition((data) => {
				setPayload({ lat: data.coords.latitude, lon: data.coords.longitude })
			})

			setChat((prev) => ({
				chat: {
					...prev.chat,
					messages: [...prev.chat.messages, message],
					buttons: message.buttons,
					inlineButtons: message.inlineButtons
				}
			}))
		})
	}, [])

	return (
		<ChatContext.Provider value={{ chat, setChat, buttonsHeight, setButtonsHeight, payload, setPayload }}>
			<div className="chat">
				<ChatView socket={socketRef} />
				<ChatForm socket={socketRef} />
			</div>
		</ChatContext.Provider>
	)
}

// я гуль
