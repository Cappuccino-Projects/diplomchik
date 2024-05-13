import { configureStore } from '@reduxjs/toolkit'

import dailyTasksReducer from '@redux/slices/dailyTasksSlice'
import userReducer from '@redux/slices/userSlice'
import shopReducer from '@redux/slices/shopSlice'
import placesReducer from '@redux/slices/placesSlice'
import citiesReducer from '@redux/slices/citiesSlice'
import locationsReducer from '@redux/slices/locationsSlice'

export const store = configureStore({
	reducer: {
		dailyTasks: dailyTasksReducer,
		user: userReducer,
		shop: shopReducer,
		places: placesReducer,
		cities: citiesReducer,
		locations: locationsReducer
	}
})
