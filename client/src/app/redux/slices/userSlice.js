import { GetRewards } from '@components/Modal/GetRewards'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	UserName: 'Анастасия',
	UserRole: 'Крутой пользователь',
	UserBalance: 541,
	UserExp: 250
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.UserName = action.payload.UserName
			state.UserRole = action.payload.UserRole
			state.UserBalance = action.payload.UserBalance
		},
		increaseBalance: (state, action) => {
			state.UserBalance += action.payload
		},
		decreaseBalance: (state, action) => {
			if (state.UserBalance >= action.payload) {
				state.UserBalance -= action.payload
			}
		},
		increaseExp: (state, action) => {
			state.UserExp += action.payload
		},
		getRewards: (state, action) => {
			const {xp, balance} = action.payload 
			state.UserExp += xp
			state.UserBalance += balance
		},

	}
})

export const { setUser, decreaseBalance, increaseBalance, increaseExp, getRewards } = userSlice.actions

export default userSlice.reducer
