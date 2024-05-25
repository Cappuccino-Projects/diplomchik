import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import dailyTasksReducer from '@redux/slices/dailyTasksSlice'
import userReducer from '@redux/slices/userSlice'
import shopReducer from '@redux/slices/shopSlice'
import placesReducer from '@redux/slices/placesSlice'
import citiesReducer from '@redux/slices/citiesSlice'
import locationsReducer from '@redux/slices/locationsSlice'
import modalsReducer from '@redux/slices/modalsSlice'
import changesReducer from '@redux/slices/changesSlice'
import { userApi } from '@redux/services/userApi'
import { productsApi } from '@redux/services/productsApi'
import { dailyTasksApi } from '@redux/services/dailyTasksApi'
import { cityApi } from '@redux/services/cityApi'
import { rankApi } from './services/rankApi'
import { reviewApi } from './services/reviewApi'
import { placeTypeApi } from './services/placeTypeApi'
import { changeApi } from './services/changeApi'
export const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[dailyTasksApi.reducerPath]: dailyTasksApi.reducer,
		[cityApi.reducerPath]: cityApi.reducer,
		[rankApi.reducerPath]: rankApi.reducer,
		[reviewApi.reducerPath]: reviewApi.reducer,
		[placeTypeApi.reducerPath]: placeTypeApi.reducer,
		[changeApi.reducerPath]: changeApi.reducer,
		dailyTasks: dailyTasksReducer,
		user: userReducer,
		shop: shopReducer,
		places: placesReducer,
		cities: citiesReducer,
		locations: locationsReducer,
		modals: modalsReducer,
		changes: changesReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(userApi.middleware)
			.concat(productsApi.middleware)
			.concat(dailyTasksApi.middleware)
			.concat(cityApi.middleware)
			.concat(rankApi.middleware)
			.concat(reviewApi.middleware)
			.concat(placeTypeApi.middleware)
			.concat(changeApi.middleware)
})
setupListeners(store.dispatch)
