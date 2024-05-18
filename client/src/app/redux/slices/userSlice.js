import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	UserName: 'Анастасия',
	UserRole: 'Крутой пользователь',
	UserLigin: 'login_Anastasia',
	UserEmail: 'pomoechki@moi.com',
	UserPassword: 'qwerty',

	UserBalance: 541,
	UserExp: 300,

	Edit: {
		Character: {
			ItemId: 10,
			ItemName: 'Светлая',
			ItemImage: 'trophy.png',
			ItemCategory: 'Character',
			ItemBackgroundColor: '#F1F1F1',
			ItemPrice: 200,
			ItemObtained: true
		},
		Avatar: {
			ItemId: 1,
			ItemName: 'Веселье',
			ItemImage: 'frame1.png',
			ItemCategory: 'Avatar Frame',
			ItemBackgroundColor: '#BDFDB2',
			ItemPrice: 5000,
			ItemObtained: true
		}
	}
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
		decreaseBalance: (state, action) => {
			if (state.UserBalance >= action.payload) {
				state.UserBalance -= action.payload
			}
		},
		getRewards: (state, action) => {
			const { xp, balance } = action.payload
			state.UserExp += xp
			state.UserBalance += balance
		},
		setEditCharacter: (state, action) => {
			state.Edit.Character = action.payload
		},
		setEditAvatar: (state, action) => {
			state.Edit.Avatar = action.payload
		}
	}
})

export const {
	setUser,
	decreaseBalance,
	increaseBalance,
	increaseExp,
	getRewards,
	setEditCharacter,
	setEditAvatar
} = userSlice.actions

export default userSlice.reducer
