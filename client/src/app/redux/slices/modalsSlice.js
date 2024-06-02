import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isOpen: false,
	modalType: '',
	data: {
		editItemToBuy: {},
		editRewiewToChange: {},
		editCompletedDailyTask: {}
	}
}

export const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		setOpen: (state, action) => {
			state.isOpen = action.payload
		},
		closeModal: (state) => {
			state.modalType = ''
			state.isOpen = false
		},
		openBuyConfirm: (state, action) => {
			state.data.editItemToBuy = action.payload
			state.modalType = 'BUYCONFIRM'
			state.isOpen = true
		},
		openRewardsNotAvalible: (state) => {
			state.modalType = 'REWARDSNOTAVALIBLE'
			state.isOpen = true
		},
		openGetRewards: (state) => {
			state.modalType = 'GETREWARDS'
			state.isOpen = true
		},
		openDailyTaskCompleted: (state, action ) => {
			state.data.editCompletedDailyTask = action.payload
			state.modalType = 'DAILYTASKCOMPLETED'
			state.isOpen = true
		},
		openLogout: (state) => {
			state.modalType = 'LOGOUT'
			state.isOpen = true
		},
		openBadPassword: (state) => {
			state.modalType = 'BADPASSWORD'
			state.isOpen = true
		},
		openBadPasswordRepeat: (state) => {
			state.modalType = 'BADPASSWORDREPEAT'
			state.isOpen = true
		},

		openEditReviewModal: (state, action) => {
			state.data.editRewiewToChange = action.payload
			state.modalType = 'EDITREVIEWMODAL'
			state.isOpen = true
		},
		openAddPlaceToMap: (state) => {
			state.modalType = 'ADDPLACETOMAP'
			state.isOpen = true
		},
		openAddDailyTask: (state) => {
			state.modalType = 'ADDDAILYTASK'
			state.isOpen = true
		},
		openEditDailyTask: (state, action) => {
			state.modalType = 'EDITDAILYTASK'
			state.isOpen = true
			state.data.editDailyTask = action.payload
		},
		openDeleteDailyTask: (state, action) => {
			state.modalType = 'DELETEDAILYTASK'
			state.isOpen = true
			state.data.deleteDailyTask = action.payload
		},
		openAddProduct: (state) => {
			state.modalType = 'ADDPRODUCT'
			state.isOpen = true
		},
		openEditProduct: (state, action) => {
			state.modalType = 'EDITPRODUCT'
			state.isOpen = true
			state.data.editProduct = action.payload
		},
		openDeleteProduct: (state, action) => {
			state.modalType = 'DELETEPRODUCT'
			state.isOpen = true
			state.data.deleteProduct = action.payload
		}
	}
})

export const {
	setOpen,
	closeModal,
	openBuyConfirm,
	openRewardsNotAvalible,
	openGetRewards,
	openLogout,
	openBadPassword,
	openBadPasswordRepeat,
	openEditReviewModal,
	openAddPlaceToMap,
	openDailyTaskCompleted,
	openAddDailyTask,
	openEditDailyTask,
	openDeleteDailyTask,
	openAddProduct,
	openEditProduct,
	openDeleteProduct
} = modalsSlice.actions

export default modalsSlice.reducer
