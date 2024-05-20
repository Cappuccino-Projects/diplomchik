import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	places: []
}

export const placesSlice = createSlice({
	name: 'places',
	initialState,
	reducers: {
		setPlaces: (state, action) => {
			state.places = action.payload
			console.log('placesSlice.js', state.places)
		}
		
	}
})

export const { setPlaces } = placesSlice.actions

export default placesSlice.reducer
