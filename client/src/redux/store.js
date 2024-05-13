import { configureStore } from '@reduxjs/toolkit'

import dailyTasksReducer from '@redux/slices/dailyTasksSlice'
import userReducer from '@redux/slices/userSlice'
import shopReducer from '@redux/slices/shopSlice'

export const store = configureStore({
	reducer: {
		dailyTasks: dailyTasksReducer,
		user: userReducer,
		shop: shopReducer
	}
})
