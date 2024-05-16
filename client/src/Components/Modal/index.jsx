import { closeModal } from '@redux/slices/modalsSlice'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BuyConfirm } from '@components/Modal/BuyConfirm'
import { GetRewards } from '@components/Modal/GetRewards'
import { ModalWindow } from '@components/Modal/ModalWindow'
import { RewardsNotAvalible } from '@components/Modal/RewardsNotAvalible'

export const Modal = () => {
	const dispatch = useDispatch()
	const { isOpen, modalType } = useSelector((state) => state.modals)

	const closeCallback = useCallback(() => {
		dispatch(closeModal())
	}, [])

	return (
		<ModalWindow isOpen={isOpen} close={closeCallback}>
			{modalType === 'BUYCONFIRM' && <BuyConfirm close={closeCallback}/>}
			{modalType === 'REWARDSNOTAVALIBLE' && (
				<RewardsNotAvalible close={closeCallback} />
			)}
			{modalType === 'GETREWARDS' && <GetRewards close={closeCallback} />}
		</ModalWindow>
	)
}
