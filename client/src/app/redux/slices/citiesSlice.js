import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cities: []
}

export const citiesSlice = createSlice({
	name: 'cities',
	initialState,
	reducers: {
		setCities: (state, action) => {
			console.log(action)
		}
	}
})

export const { setCities } = citiesSlice.actions

export default citiesSlice.reducer
