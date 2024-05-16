import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isOpen: false,
	modalType: '',
	data: {
		editItemToBuy: {}
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
		}
	}
})

export const {
	setOpen,
	closeModal,
	openBuyConfirm,
	openRewardsNotAvalible,
	openGetRewards
} = modalsSlice.actions

export default modalsSlice.reducer
