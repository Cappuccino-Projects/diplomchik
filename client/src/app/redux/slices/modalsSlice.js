import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	modals: []
}

export const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		setPlaces: (state, action) => {
			state.places = action.payload
		}
		
	}
})

export const { setPlaces } = modalsSlice.actions

export default modalsSlice.reducer