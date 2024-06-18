import { BadPassword } from '@components/Modal/BadPassword'
import { BadPasswordRepeat } from '@components/Modal/BadPasswordRepeat'
import { BuyConfirm } from '@components/Modal/BuyConfirm'
import { DailyTaskCompleted } from '@components/Modal/DailyTaskCompleted'
import { EditReviewModal } from '@components/Modal/EditReviewModal'
import { GetRewards } from '@components/Modal/GetRewards'
import { Logout } from '@components/Modal/Logout'
import { ModalWindow } from '@components/Modal/ModalWindow'
import { RewardsNotAvalible } from '@components/Modal/RewardsNotAvalible'
import { closeModal } from '@redux/slices/modalsSlice'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteDailyTask } from './DeleteDailyTask'
import { DeletePlace } from './DeletePlace'
import { DeleteProduct } from './DeleteProduct'
import { DeleteReview } from './DeleteReview'
import { DeleteUser } from './DeleteUser'
import { EditDailyTask } from './EditDailyTask'
import { EditProduct } from './EditProduct'
import { EditUser } from './EditUser'
import { AddDailyTask } from './addDailyTask'
import { AddFavoriteModal } from './addFavoriteModal'
import { AddProduct } from './addProduct'
import { AddUser } from './addUser'

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
			{/* {modalType === 'EDITLOCATION' && <EditLocation close={closeCallback} />} */}
			{modalType === 'LOGOUT' && <Logout close={closeCallback} />}

			{modalType === 'BADPASSWORD' && <BadPassword close={closeCallback} />}
			{modalType === 'BADPASSWORDREPEAT' && (
				<BadPasswordRepeat close={closeCallback} />
			)}
			{modalType === 'REWARDSNOTAVALIBLE' && (
				<RewardsNotAvalible close={closeCallback} />
			)}
			{modalType === 'EDITREVIEWMODAL' && (
				<EditReviewModal close={closeCallback} />
			)}
			{modalType === 'GETREWARDS' && <GetRewards close={closeCallback} />}
			{modalType === 'DAILYTASKCOMPLETED' && (
				<DailyTaskCompleted close={closeCallback} />
			)}

			{modalType === 'EDITDAILYTASK' && <EditDailyTask />}
			{modalType === 'DELETEDAILYTASK' && <DeleteDailyTask />}
			{modalType === 'ADDDAILYTASK' && <AddDailyTask />}

			{modalType === 'EDITPRODUCT' && <EditProduct />}
			{modalType === 'DELETEPRODUCT' && <DeleteProduct />}
			{modalType === 'ADDPRODUCT' && <AddProduct />}

			{modalType === 'DELETEPLACE' && <DeletePlace />}
			{/* {modalType === 'ADDPLACE' && <AddPlace />}
			{modalType === 'EDITPLACE' && <EditPlace />} */}

			{modalType === 'ADDUSER' && <AddUser />}
			{modalType === 'DELETEUSER' && <DeleteUser />}
			{modalType === 'EDITUSER' && <EditUser />}

			{modalType === 'DELETEREVIEW' && <DeleteReview />}
			{modalType === 'ADDFAVORITE' && <AddFavoriteModal />}
		</ModalWindow>,
		portal
	)
}
