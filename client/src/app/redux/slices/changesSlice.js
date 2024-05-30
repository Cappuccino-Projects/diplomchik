import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	changes: []
}	

export const changesSlice = createSlice({
	name: 'changes',
	initialState,
	reducers: {
		setChanges: (state, action) => {
			state.changes = action.payload
		}
		
	}
})

export const { setChanges } = changesSlice.actions

export default changesSlice.reducer