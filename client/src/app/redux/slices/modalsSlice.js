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
		openDailyTaskCompleted: (state, action) => {
			state.data.editCompletedDailyTask = action.payload
			state.modalType = 'DAILYTASKCOMPLETED'
			state.isOpen = true
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
	openDailyTaskCompleted
} = modalsSlice.actions

export default modalsSlice.reducer
