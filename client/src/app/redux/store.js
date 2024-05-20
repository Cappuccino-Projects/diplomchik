import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import dailyTasksReducer from '@redux/slices/dailyTasksSlice'
import userReducer from '@redux/slices/userSlice'
import shopReducer from '@redux/slices/shopSlice'
import placesReducer from '@redux/slices/placesSlice'
import citiesReducer from '@redux/slices/citiesSlice'
import locationsReducer from '@redux/slices/locationsSlice'
import modalsReducer from '@redux/slices/modalsSlice'
import { userApi } from '@redux/services/userApi'
import { productsApi } from '@redux/services/productsApi'
import { dailyTasksApi } from '@redux/services/dailyTasksApi'
import { cityApi } from '@redux/services/cityApi'
export const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[dailyTasksApi.reducerPath]: dailyTasksApi.reducer,
		[cityApi.reducerPath]: cityApi.reducer,
		dailyTasks: dailyTasksReducer,
		user: userReducer,
		shop: shopReducer,
		places: placesReducer,
		cities: citiesReducer,
		locations: locationsReducer,
		modals: modalsReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(userApi.middleware)
			.concat(productsApi.middleware)
			.concat(dailyTasksApi.middleware)
			.concat(cityApi.middleware)
})
setupListeners(store.dispatch)
