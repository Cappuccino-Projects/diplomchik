import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {
		id: 0,
		login: 'test2',
		displayName: '',
		email: '',
		passwordHash: '123',
		cityId: 0,
		avatarPath: null,
		themeId: null,
		rankId: null,
		experience: 0,
		balance: 0,
		city: null,
		theme: null,
		rank: null
	}
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		}
	}
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
