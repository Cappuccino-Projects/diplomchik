
import { cityApi } from '@redux/services/cityApi'
import { dailyTasksApi } from '@redux/services/dailyTasksApi'
import { productsApi } from '@redux/services/productsApi'
import { userApi } from '@redux/services/userApi'
import changesReducer from '@redux/slices/changesSlice'
import locationsReducer from '@redux/slices/locationsSlice'
import modalsReducer from '@redux/slices/modalsSlice'
import placesReducer from '@redux/slices/placesSlice'
import userReducer from '@redux/slices/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { changeApi } from './services/changeApi'
import { changesApi } from './services/changesApi'
import { placeTypeApi } from './services/placeTypeApi'
import { productTypesApi } from './services/productTypeApi'
import { rankApi } from './services/rankApi'
import { reviewApi } from './services/reviewApi'
import { uploadApi } from './services/uploadApi'
import markerReducer from './slices/markerSlice'

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
		[productTypesApi.reducerPath]: productTypesApi.reducer,
		[changesApi.reducerPath]: changesApi.reducer,
		[uploadApi.reducerPath]: uploadApi.reducer,
		user: userReducer,
		places: placesReducer,
		locations: locationsReducer,
		modals: modalsReducer,
		marker: markerReducer,
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
			.concat(productTypesApi.middleware)
			.concat(changesApi.middleware)
			.concat(uploadApi.middleware)
})
setupListeners(store.dispatch)
