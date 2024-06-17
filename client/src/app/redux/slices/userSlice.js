import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	usersList: [],
	user: {}
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		addUsers: (state, action) => {
			state.usersList = action.payload
		},
		deleteUser: (state, action) => {
			state.usersList = state.usersList.filter(user => user.id !== action.payload)
		},
		addUser: (state, action) => {
			state.usersList.push(action.payload)
		},
		updateUser: (state, action) => {
			const { id, ...user } = action.payload
			state.usersList = state.usersList.map(u => u.id === id ? { ...u, ...user } : u)
		}
	},
})

export const { setUser, addUsers, deleteUser, addUser, updateUser } = userSlice.actions

export default userSlice.reducer
