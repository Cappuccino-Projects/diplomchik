import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	shop: []
}

export const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		setShop: (state, action) => {
			state.shop = action.payload
		}
	}
})

export const { setShop, buyItem } = shopSlice.actions

export default shopSlice.reducer
