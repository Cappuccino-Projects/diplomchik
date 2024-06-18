import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	coordinates: { lat: null, lng: null }
}

const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setCoordinates: (state, action) => {
			state.coordinates = action.payload
		},
		resetCoordinates: (state) => {
			state.coordinates = { lat: null, lng: null }
		}
	}
})

export const { setCoordinates, resetCoordinates } = mapSlice.actions

export default mapSlice.reducer