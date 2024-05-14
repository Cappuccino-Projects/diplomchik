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
		},
		buyItem: (state, action) => {
			// !!! Какая то затычка 
			const ItemId = action.payload

			const itemIndex = state.shop.findIndex((item) => item.ItemId === ItemId)

			if (itemIndex !== -1) {
				state.shop[itemIndex].ItemObtained = true
			}
		}
	}
})

export const { setShop, buyItem } = shopSlice.actions

export default shopSlice.reducer
