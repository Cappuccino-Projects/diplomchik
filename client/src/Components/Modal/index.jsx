import { closeModal } from '@redux/slices/modalsSlice'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import { BuyConfirm } from '@components/Modal/BuyConfirm'
import { GetRewards } from '@components/Modal/GetRewards'
import { ModalWindow } from '@components/Modal/ModalWindow'
import { Logout } from '@components/Modal/Logout'
import { BadPassword } from '@components/Modal/BadPassword'
import { BadPasswordRepeat } from '@components/Modal/BadPasswordRepeat'
import { RewardsNotAvalible } from '@components/Modal/RewardsNotAvalible'

const portal = document.getElementById('portal')

export const Modal = () => {
	const dispatch = useDispatch()
	const { isOpen, modalType } = useSelector((state) => state.modals)

	const closeCallback = useCallback(() => {
		dispatch(closeModal())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return ReactDOM.createPortal(
		<ModalWindow isOpen={isOpen} close={closeCallback}>
			{modalType === 'BUYCONFIRM' && <BuyConfirm close={closeCallback} />}
			{modalType === 'EDITLOCATION' && <EditLocation close={closeCallback} />}
			{modalType === 'LOGOUT' && <Logout close={closeCallback} />}

			{modalType === 'BADPASSWORD' && <Logout close={closeCallback} />}
			{modalType === 'BADPASSWORDREPEAT' && <Logout close={closeCallback} />}

			{modalType === 'REWARDSNOTAVALIBLE' && (
				<RewardsNotAvalible close={closeCallback} />
			)}
			{modalType === 'GETREWARDS' && <GetRewards close={closeCallback} />}
		</ModalWindow>,
		portal
	)
}
