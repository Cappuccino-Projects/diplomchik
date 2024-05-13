import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	avatars: [],
	themes: []
}

export const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		setShop: (state, action) => {
			state.avatars = action.payload.filter(
                (CurrentItem) => CurrentItem.ItemCategory === 'Avatar Frame'
            )
            state.themes = action.payload.filter(
                (CurrentItem) => CurrentItem.ItemCategory === 'Theme'
            )
            
        }
	}
})

export const { setShop } = shopSlice.actions

export default shopSlice.reducer
