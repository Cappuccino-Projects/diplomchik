import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	UserName: 'Анастасия',
	UserRole: 'Крутой пользователь',
	UserBalance: 541
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.UserName = action.payload.UserName
			state.UserRole = action.payload.UserRole
			state.UserBalance = action.payload.UserBalance
		}
	}
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
