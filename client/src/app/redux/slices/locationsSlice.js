import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	locations: [],
}

export const locationsSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {
		setLocations: (state, action) => {
			state.locations = action.payload
		},
		
	}
})

export const { setLocations } =
	locationsSlice.actions

export default locationsSlice.reducer
